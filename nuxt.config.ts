// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: true,

  future: {
    compatibilityVersion: 4,
  },

  nitro: {
    preset: "node-server",
  },

  mongoose: {
    uri: process.env.MONGOOSE_URI,
  },

  tailwindcss: {
    cssPath: ["~/assets/css/main.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
  },

  googleFonts: {
    families: {
      Inter: [400, 500, 700],
      Prompt: [400, 500, 700],
      "Chakra Petch": [400, 500, 700],
      "Ubuntu Mono": [400, 500, 700],
    },
  },

  i18n: {
    lazy: true,
    langDir: "locales/",
    strategy: "prefix",
    defaultLocale: "en",
    locales: [
      {
        name: "English",
        code: "en",
        language: "en",
        file: "en.json",
      },
      {
        name: "Türkçe",
        code: "tr",
        language: "tr",
        file: "tr.json",
      },
    ],
  },

  components: {
    loader: true,
    global: true,
    dirs: ["~/components"],
  },

  colorMode: {
    storageKey: "theme",
  },

  modules: [
    "@nuxt/eslint",
    "nuxt-mongoose",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "@pinia/nuxt",
  ],
});
