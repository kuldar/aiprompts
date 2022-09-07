/// <reference types="vitest" />
/// <reference types="vite/client" />

const react = require("@vitejs/plugin-react");

const { defineConfig } = require("vite");

const tsconfigPaths = require("vite-tsconfig-paths");

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./test/setup-test-env.js"],
  },
});
