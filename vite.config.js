import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  publicDir: "public",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        android: resolve(__dirname, "android.html"),
        apple: resolve(__dirname, "apple.html"),
      },
    },
  },
});
