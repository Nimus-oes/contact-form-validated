import { defineConfig } from "i18next-cli";

export default defineConfig({
  locales: ["en", "ko"],
  extract: {
    input: "src/**/*.{ts,tsx}",
    output: "src/locales/{{language}}/{{namespace}}.json",
  },
});
