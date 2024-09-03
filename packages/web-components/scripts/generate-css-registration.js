import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import chalk from 'chalk';
import designTokensSemantic from '../src/styles/design-tokens.semantic.json' assert { type: 'json' };


/**
 * This script generates files based on component token maps which may be used by consumers to register their CSS properties
 * during import and build time, or as exported consts in their CSS.
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(path.dirname(__filename), '../');

const ctrlsMapped = [
  {
    name: "button",
    designTokens: ["Button", "Default"]
  }
];

const comment =
  '/* THIS FILE IS GENERATED AS PART OF THE BUILD PROCESS FROM scripts/generate-css-registration.js. DO NOT MANUALLY MODIFY THIS FILE. */\n';

// Create the design-token.ts file for each control
(async () => {
  ctrlsMapped.forEach((ctrl) => {
    import(
      path.resolve(__dirname, `./src/${ctrl.name}/${ctrl.name}.design-tokens.fluent2.json`),
      { assert: { type: 'json' } }
    ).then(
      (data) => {
        const tokens = [];
        const exportPath = path.resolve(__dirname, `./src/${ctrl.name}/design-tokens.ts`);
        let content = `${comment}\n`;

        Object.entries(data.default).forEach(([key, value]) => {
          data.default[key].forEach((ctrlToken, index) => {
              if (ctrlToken.fallback.fluent2.name !== null) {
                const tokenWithSemanticFallback = ctrlToken;
                tokenWithSemanticFallback.fallback.semantic = designTokensSemantic[key][index].fallback.semantic;
                tokens.push(tokenWithSemanticFallback);
              }
          });
        });

        tokens.forEach((token) => {
          content += `export const ${token.name.slice(2)} = \`var(${token.name}, var(${token.fallback.semantic.name}, var(${token.fallback.fluent2.name})))\`;\n`
        });

        fs.writeFile(exportPath, content, (error) => {
          if (error) throw error;
          console.log(chalk.greenBright(`Design Token export file successfully generated`));
        });
      });
  });
})();
