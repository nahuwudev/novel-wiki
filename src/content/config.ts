import { defineCollection, z } from "astro:content";

const RasgosEnum = z.enum([
  "Rampagor",
  "Evorian",
  "Teur",
  "Augur",
  "Albaran",
  "Asterion",
  "Alterior",
  "Gardian",
  "Primordial",
]);

const characters = defineCollection({
  schema: z.object({
    nombre: z.string(),
    pais: z.string(),
    apadrinada: z.boolean(),
    rasgos: z.array(RasgosEnum),
    profileUrl: z.string(),
  }),
});

export const collections = { characters };
