import { tagNameFix, typescriptTypeTextSanitize } from "./custom-elements-manifest.plugins.js";
import { customElementVsCodePlugin } from "custom-element-vs-code-integration";

export default {
    /** Globs to analyze */
    globs: ["src/**/*.ts"],
    /** Globs to exclude */
    exclude: [
        "*.js",
        "*.ts",
        "src/helpers.stories.ts",
        "src/helpers.tests.ts",
        "src/index-rollup.ts",
        "src/utils/benchmark-wrapper.ts",
        "src/**/*.bench.ts",
        "src/**/*.spec.ts",
        "src/**/*.stories.ts",
        "src/**/define.ts",
        "src/**/index.ts",
        "src/**/*.md"
    ],
    /** Directory to output CEM to */
    outdir: "dist",
    /** Run in dev mode, provides extra logging */
    dev: false,
    /** Enable special handling for fast */
    fast: true,
    plugins: [
      tagNameFix(),
      typescriptTypeTextSanitize(),
      customElementVsCodePlugin({
        outdir: "dist"
      })
    ],
};
