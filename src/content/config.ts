import { defineCollection, z } from "astro:content";

const RasgosEnum = z.enum([
  "Rampagor",
  "Mefistofelo",
  "Evorian",
  "Teur",
  "Augur",
  "Albaran",
  "Asterion",
  "Alterior",
  "Gardian",
]);

const HabilidadesEnum = z.enum(["Trifarico", "Bifarico", "Primordial"]);

const LinajeEnum = z.enum([
  "Primario", // Linaje principal, familia noble o real
  "Secundario", // Apadrinados o adoptados
]);

const RelationObj = z.object({
  nombre: z.string(),
  parentesco: z.string(),
  link: z.string(),
});

const characters = defineCollection({
  schema: ({ image }) =>
    z.object({
      nombre: z.string(),
      faccion: z.string(),
      linaje: LinajeEnum,
      rasgos: z.array(RasgosEnum).optional(),
      profile: image(),
      card_profile: image(),
      exomante: z.boolean(),
      titulos: z.string().optional(),
      familia: z.string().optional(),
      relaciones: z.array(RelationObj),
      habilidad: z.array(HabilidadesEnum).optional(),
    }),
});

export const collections = { characters };
