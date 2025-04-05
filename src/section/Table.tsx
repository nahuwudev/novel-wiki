import React from "react";
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import type { InferEntrySchema } from "astro:content"; // Importando el tipo correcto de InferEntrySchema

// Tipo para el personaje basado en el esquema de Astro
type Character = InferEntrySchema<"characters"> & { slug: string };

interface TableProps {
  data: Character[];
}

const columnHelper = createColumnHelper<Character>();

const columns = [
  columnHelper.accessor("nombre", {
    header: () => "Nombre",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("faccion", {
    header: () => "Facción",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("exomante", {
    header: () => "Exomante",
    cell: (info) => (info.renderValue() ? "Si" : "No"),
  }),
];

const Table: React.FC<TableProps> = ({ data }) => {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const table = useReactTable({
    columns,
    data,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="bg-white rounded-md my-10  shadow  p-5">
      <HeaderTable 
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      />
      <table border={1} className="w-full ">
        <thead className="bg-slate-200 h-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="text-left pl-2" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  className="p-2 text-sm font-light border-b border-gray-300"
                  key={cell.id}
                >
                  <a href={`/personajes/${row.original.slug}`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </a>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </section>
  );
};

const HeaderTable = ({
  globalFilter,
  setGlobalFilter,
}: {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}) => {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h3 className="cursor-default sm:text-2xl text-xl">Personajes</h3>
      <input
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        type="search"
        className="border border-gray-300 rounded-md p-1"
        placeholder=" Buscar..."
      />
    </div>
  );
};

const Pagination = () => {
  return (
    <div className="mt-5 flex items-center justify-between">
      <p className=" text-gray-400 text-xs">
        <span className="sm:block hidden">Mostrando 1 a 3 de 50 entradas</span>
        <span className="sm:hidden block">1 a 3</span>
      </p>

      <nav className="flex space-x-4 items-center">
        <ButtonPagination disabled label="Anterior" />
        <ul className="sm:flex hidden">
          <li>
            <ButtonPagination active label="1" />
          </li>
          <li className="mx-2">
            <ButtonPagination label="2" />
          </li>
          <li>
            <ButtonPagination label="3" />
          </li>
        </ul>
        <ButtonPagination label="Siguiente" />
      </nav>
    </div>
  );
};

const ButtonPagination = ({
  label,
  active = false,
  disabled = false,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
}) => {
  const isActive = active && "bg-slate-800 text-white";
  const isDisabled = !active && disabled && "text-gray-400";
  const styles = `${isActive} ${isDisabled} font-medium border border-slate-300 py-1 px-3 rounded-md`;
  return <button className={styles}>{label}</button>;
};

export default Table;
