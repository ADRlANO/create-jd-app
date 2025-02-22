import { IInstaller } from "~types";

const config: IInstaller = (ctx) => ({
  name: "TailwindCSS",
  files: [
    {
      path: `${__dirname}/files/styles.txt`,
      to: `${ctx.userDir}/src/root.css`,
    },
    {
      path: `${__dirname}/files/postcss.config.txt`,
      to: `${ctx.userDir}/postcss.config.cjs`,
    },
    {
      path: `${__dirname}/files/tailwind.config.txt`,
      to: `${ctx.userDir}/tailwind.config.cjs`,
    },
  ],
  pkgs: {
    tailwindcss: { devMode: true },
    postcss: { devMode: true },
    autoprefixer: { devMode: true },
  },
});

export default config;
