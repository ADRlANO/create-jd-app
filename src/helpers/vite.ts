import fs from "fs-extra";
import path from "path";
import { ICtx, IUtil } from "~types";

export const getViteConfig: IUtil = (ctx) => {
  const useUno = ctx.installers.includes("UnoCSS");
  const plugins =
    useUno && ctx.vercel
      ? `[
      solid({ ssr: false, adapter: vercel({ edge: false }) }),
      UnoCSS(unoConfig),
    ]`
      : useUno
      ? "[solid({ ssr: false }), UnoCSS(unoConfig)]"
      : `[solid({ ssr: false, adapter: vercel({ edge: false }) })]`;
  return `import solid from "solid-start/vite";
import dotenv from "dotenv";${
    useUno
      ? `\nimport UnoCSS from "unocss/vite";
import unoConfig from "./unocss.config";`
      : ""
  }
import { defineConfig } from "vite";${
    ctx.vercel
      ? `\n// @ts-expect-error no typing
import vercel from "solid-start-vercel";`
      : ""
  }
  
export default defineConfig(() => {
  dotenv.config();
  return {
    plugins: ${plugins},
  };
});
  `;
};

export const modifyConfigIfNeeded = async (ctx: ICtx) => {
  if (ctx.vercel || ctx.installers.includes("UnoCSS")) {
    await fs.writeFile(
      path.join(ctx.userDir, "vite.config.ts"),
      getViteConfig(ctx)
    );
  }
};
