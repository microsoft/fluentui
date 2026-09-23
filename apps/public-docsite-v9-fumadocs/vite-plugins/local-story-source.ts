import * as babel from '@babel/core';
import { readFileSync } from 'node:fs';
import * as prettier from 'prettier';
// Workspace-source helpers keep slicing and import rewriting consistent with Storybook.
import { sliceStorySource } from '../../../packages/react-components/babel-preset-storybook-full-source/src/sliceStory';
import { modifyImportsPlugin } from '../../../packages/react-components/babel-preset-storybook-full-source/src/modifyImports';
import { removeStorybookParameters } from '../../../packages/react-components/babel-preset-storybook-full-source/src/removeStorybookParameters';
import { inlineLocalImports } from './inlineLocalImports';
import type { FullSourceOptions } from './full-source';

/** Attach enriched source metadata without replacing the imports/declarations executed by Vite. */
export function localStorySource(options: FullSourceOptions): babel.PluginObj {
  const t = babel.types;
  return {
    name: 'fluentui:local-story-source',
    visitor: {
      Program: {
        exit(program, state) {
          const filename = state.filename;
          if (!filename) {
            throw new Error('Local story extraction requires a filename');
          }
          const names = program.node.body
            .flatMap(node => {
              if (!t.isExportNamedDeclaration(node)) {
                return [];
              }
              const declaration = node.declaration;
              if (t.isFunctionDeclaration(declaration) && declaration.id) {
                return [declaration.id.name];
              }
              if (t.isVariableDeclaration(declaration) && declaration.declarations.length === 1) {
                const id = declaration.declarations[0].id;
                if (t.isIdentifier(id)) {
                  return [id.name];
                }
              }
              return [];
            })
            .filter(name => /^[A-Z]/.test(name));
          if (!names.length) {
            return;
          }

          const inlined = inlineLocalImports(babel, readFileSync(filename, 'utf8'), filename);
          const tokensFile = typeof options.cssModules === 'object' ? options.cssModules.tokensFilePath : undefined;
          const css = {
            ...(inlined.cssModules.length ? { cssModules: inlined.cssModules } : {}),
            ...(tokensFile ? { tokensSource: readFileSync(tokensFile, 'utf8') } : {}),
          };
          for (const name of names) {
            const sliced = sliceStorySource(babel, inlined.code, { targetStory: name, filename });
            if (!sliced) {
              continue;
            }
            const transformed = babel.transformSync(sliced, {
              filename,
              babelrc: false,
              configFile: false,
              comments: false,
              parserOpts: { plugins: ['typescript', 'jsx'] },
              plugins: [[modifyImportsPlugin, options], removeStorybookParameters],
            });
            if (!transformed?.code) {
              throw new Error(`Unable to extract ${name} from ${filename}`);
            }
            const source = prettier.format(transformed.code, { parser: 'babel-ts' });
            const parameters = t.memberExpression(t.identifier(name), t.identifier('parameters'));
            const metadata = [t.objectProperty(t.identifier('fullSource'), t.stringLiteral(source))];
            if (options.cssModules && Object.keys(css).length) {
              const existing = t.memberExpression(t.cloneNode(parameters), t.identifier('cssModuleSources'));
              metadata.push(
                t.objectProperty(
                  t.identifier('cssModuleSources'),
                  t.callExpression(t.memberExpression(t.identifier('Object'), t.identifier('assign')), [
                    t.objectExpression([]),
                    t.logicalExpression('&&', t.cloneNode(parameters), existing),
                    t.valueToNode(css),
                  ]),
                ),
              );
            }
            program.pushContainer(
              'body',
              t.expressionStatement(
                t.assignmentExpression(
                  '=',
                  t.cloneNode(parameters),
                  t.callExpression(t.memberExpression(t.identifier('Object'), t.identifier('assign')), [
                    t.objectExpression([]),
                    t.cloneNode(parameters),
                    t.objectExpression(metadata),
                  ]),
                ),
              ),
            );
          }
        },
      },
    },
  };
}
