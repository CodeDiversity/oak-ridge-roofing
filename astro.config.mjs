// @ts-check
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Archivo",
      cssVariable: "--font-body",
    },
    {
      provider: fontProviders.google(),
      name: "Roboto Slab",
      cssVariable: "--font-headline",
    },
  ],
});
