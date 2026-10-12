import * as Babel from '@babel/core';
import * as prettier from 'prettier';
import * as fs from 'fs';
import * as nodePath from 'path';

import { modifyImportsPlugin } from './modifyImports';
import { removeStorybookParameters } from './removeStorybookParameters';
import { sliceStorySource } from './sliceStory';
import { BabelPluginOptions } from './types';

export const PLUGIN_NAME = 'storybook-stories-fullsource';

/**
 * This Babel plugin adds `context.parameters.fullSource` property to Storybook stories,
 * which contains source of the file where story is present.
 *
 * Specifically, it finds this expression in a story file: Story.parameters = ...
 * In case Story.parameters doesn't exist, it creates it.
 * And adds the following expression after it: Story.parameters.fullSource = `...`;
 *
 * This plugin is utilized by Export to CodeSandbox.
 *
 * @param babel - babel instance
 * @returns babel plugin
 */
export function fullSourcePlugin(babel: typeof Babel, options: BabelPluginOptions): Babel.PluginObj {
  const { types: t } = babel;
  const cssModulesConfig = typeof options.cssModules === 'object' ? options.cssModules : undefined;
  const cssModulesEnabled = Boolean(options.cssModules);
  const granularity = options.storyGranularity ?? 'file';

  let storyName: string;
  // All component-like story exports in document order (used by 'story' mode).
  let storyNames: string[] = [];
  // Story names that already have a `<Story>.parameters = …` assignment.
  const storiesWithParameters = new Set<string>();

  const createStoryParametersAssignmentExpression = (targetStoryName: string) => {
    const storyParameters = t.assignmentExpression(
      '=',
      t.memberExpression(t.identifier(targetStoryName), t.identifier('parameters')),
      t.objectExpression([]),
    );

    return t.expressionStatement(storyParameters);
  };

  const createFullSourceAssignmentExpression = (targetStoryName: string, fullSource: string) => {
    return t.expressionStatement(
      t.assignmentExpression(
        '=',
        t.memberExpression(
          t.memberExpression(t.identifier(targetStoryName), t.identifier('parameters')),
          t.identifier('fullSource'),
        ),
        t.stringLiteral(fullSource),
      ),
    );
  };

  /**
   * Builds an AST expression that merges auto-detected CSS module data into
   * `Story.parameters.cssModuleSources`:
   *
   *   Story.parameters.cssModuleSources = Object.assign({}, Story.parameters.cssModuleSources, {
   *     cssModules: [{ name: '…', source: '…' }, …],
   *     tokensSource: '…',
   *   });
   */
  const createCssModuleSourcesAssignment = (
    targetStoryName: string,
    data: {
      cssModules?: Array<{ name: string; source: string }>;
      tokensSource?: string;
    },
  ) => {
    const storyParametersCssModuleSources = t.memberExpression(
      t.memberExpression(t.identifier(targetStoryName), t.identifier('parameters')),
      t.identifier('cssModuleSources'),
    );

    const properties: Babel.types.ObjectProperty[] = [];

    if (data.cssModules && data.cssModules.length > 0) {
      const modulesArray = t.arrayExpression(
        data.cssModules.map(m =>
          t.objectExpression([
            t.objectProperty(t.identifier('name'), t.stringLiteral(m.name)),
            t.objectProperty(t.identifier('source'), t.stringLiteral(m.source)),
          ]),
        ),
      );
      properties.push(t.objectProperty(t.identifier('cssModules'), modulesArray));
    }

    if (data.tokensSource) {
      properties.push(t.objectProperty(t.identifier('tokensSource'), t.stringLiteral(data.tokensSource)));
    }

    const mergedObject = t.callExpression(t.memberExpression(t.identifier('Object'), t.identifier('assign')), [
      t.objectExpression([]),
      storyParametersCssModuleSources,
      t.objectExpression(properties),
    ]);

    return t.expressionStatement(t.assignmentExpression('=', storyParametersCssModuleSources, mergedObject));
  };

  return {
    name: PLUGIN_NAME,
    visitor: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ExportNamedDeclaration(path) {
        const declaration = path.node.declaration;

        // Check if it's a function declaration
        if (
          t.isFunctionDeclaration(declaration) &&
          t.isIdentifier(declaration.id) &&
          isComponentLikeName(declaration.id.name)
        ) {
          storyName = declaration.id.name;
          storyNames.push(declaration.id.name);
          return;
        }

        // Check if it's a variable declaration
        if (
          t.isVariableDeclaration(declaration) &&
          declaration.declarations.length === 1 &&
          t.isIdentifier(declaration.declarations[0].id) &&
          isComponentLikeName(declaration.declarations[0].id.name)
        ) {
          storyName = declaration.declarations[0].id.name;
          storyNames.push(declaration.declarations[0].id.name);
          return;
        }
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      AssignmentExpression(path) {
        if (
          t.isMemberExpression(path.node.left) &&
          t.isIdentifier(path.node.left.object) &&
          t.isIdentifier(path.node.left.property) &&
          path.node.left.property.name === 'parameters'
        ) {
          storiesWithParameters.add(path.node.left.object.name);
        }
      },
      Program: {
        enter() {
          storyName = '';
          storyNames = [];
          storiesWithParameters.clear();
        },
        exit(path, state) {
          if (!state.filename || storyNames.length === 0) {
            return;
          }

          const fileContents = fs.readFileSync(state.filename, 'utf-8');
          const tokensSource =
            cssModulesEnabled && cssModulesConfig?.tokensFilePath
              ? fs.readFileSync(cssModulesConfig.tokensFilePath, 'utf-8')
              : undefined;
          // Auto-detected CSS module imports are file-level (identical for every
          // story), so collect them once and reuse for each emitted story.
          const cssModules = cssModulesEnabled ? collectCssModuleImports(path, t, state.filename) : [];

          // Runs the shared modify-imports + prettier pipeline over a source string.
          const buildFullSource = (source: string): string => {
            const transformed = babel.transformSync(source, {
              ...state.file.opts,
              compact: false,
              retainLines: true,
              comments: false,
              plugins: [[modifyImportsPlugin, options], removeStorybookParameters],
            })?.code;

            return prettier.format(transformed ?? '', { parser: 'babel-ts' });
          };

          // Emits `<Story>.parameters` (when missing), `.fullSource` and, when
          // enabled, `.cssModuleSources` for a single story.
          const emitStorySource = (currentStory: string, code: string): void => {
            if (!storiesWithParameters.has(currentStory)) {
              path.pushContainer('body', createStoryParametersAssignmentExpression(currentStory));
              storiesWithParameters.add(currentStory);
            }

            path.pushContainer('body', createFullSourceAssignmentExpression(currentStory, code));

            if (cssModulesEnabled && (cssModules.length > 0 || tokensSource)) {
              path.pushContainer('body', createCssModuleSourcesAssignment(currentStory, { cssModules, tokensSource }));
            }
          };

          if (granularity === 'story') {
            for (const currentStory of storyNames) {
              const sliced = sliceStorySource(babel, fileContents, {
                targetStory: currentStory,
                filename: state.filename,
              });

              if (!sliced) {
                continue;
              }

              emitStorySource(currentStory, buildFullSource(sliced));
            }

            return;
          }

          // 'file' granularity (default, legacy): the whole file on the last story.
          if (!storyName) {
            return;
          }

          emitStorySource(storyName, buildFullSource(fileContents));
        },
      },
    },
  };
}

/**
 * Checks if the name is a component-like name.
 *
 * @param name - name to check
 * @returns true if the name is a component-like name (starts with a capital letter)
 */
function isComponentLikeName(name: string) {
  return name.charAt(0) === name.charAt(0).toUpperCase();
}

/**
 * Walks the program's import declarations looking for `*.module.css` imports
 * (excluding `?raw` query imports). For each match, resolves the file on disk
 * and returns `{ name, source }` pairs.
 */
function collectCssModuleImports(
  programPath: Babel.NodePath<Babel.types.Program>,
  t: typeof Babel.types,
  filename: string,
): Array<{ name: string; source: string }> {
  const dir = nodePath.dirname(filename);
  const seen = new Set<string>();
  const result: Array<{ name: string; source: string }> = [];

  for (const node of programPath.node.body) {
    if (!t.isImportDeclaration(node)) {
      continue;
    }
    const src = node.source.value;
    // Match relative *.module.css imports but skip ?raw query imports
    if (!/\.module\.css$/.test(src) || src.includes('?')) {
      continue;
    }
    const resolved = nodePath.resolve(dir, src);
    if (seen.has(resolved)) {
      continue;
    }
    seen.add(resolved);
    try {
      const source = fs.readFileSync(resolved, 'utf-8');
      result.push({ name: nodePath.basename(resolved), source });
    } catch {
      // CSS file not found — skip silently (it may be handled by webpack aliases)
    }
  }

  return result;
}
