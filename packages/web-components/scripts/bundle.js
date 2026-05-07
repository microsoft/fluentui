import { build } from 'esbuild';
import { readFile } from 'fs/promises';
import { parseLiterals } from 'parse-literals';
import { transformCSSFragment, transformHTMLFragment } from './transform-fragments.js';

const transforms = {
  css: transformCSSFragment,
  html: transformHTMLFragment,
};

/**
 * esbuild plugin that minifies tagged template literal content (css`...` and html`...`)
 * using AST-based parsing from `parse-literals` to correctly handle nested templates,
 * with the existing transform functions for CSS and HTML minification.
 */
function transformTaggedTemplates() {
  return {
    name: 'transform-tagged-templates',
    setup(build) {
      build.onLoad({ filter: /src\/.*\.ts$/ }, async args => {
        const source = await readFile(args.path, 'utf8');
        const literals = parseLiterals(source);

        // Collect all replacements sorted by position (descending) to splice from end to start
        const replacements = [];
        for (const literal of literals) {
          const transform = transforms[literal.tag];
          if (!transform) continue;

          for (const part of literal.parts) {
            const transformed = transform(part.text);
            if (transformed !== part.text) {
              replacements.push({ start: part.start, end: part.end, text: transformed });
            }
          }
        }

        if (replacements.length === 0) {
          return { contents: source, loader: 'ts' };
        }

        // Apply replacements from end to start to preserve positions
        replacements.sort((a, b) => b.start - a.start);
        let result = source;
        for (const { start, end, text } of replacements) {
          result = result.slice(0, start) + text + result.slice(end);
        }

        return { contents: result, loader: 'ts' };
      });
    },
  };
}

const sharedOptions = {
  entryPoints: ['src/index.bundle.ts'],
  bundle: true,
  format: 'esm',
  platform: 'browser',
  tsconfig: 'tsconfig.lib.json',
  plugins: [transformTaggedTemplates()],
};

await build({
  ...sharedOptions,
  outfile: 'dist/web-components.js',
});

await build({
  ...sharedOptions,
  outfile: 'dist/web-components.min.js',
  minify: true,
});
