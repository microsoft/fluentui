import { formatFiles, joinPathFragments, ProjectConfiguration, readProjectConfiguration, Tree } from '@nx/devkit';

import * as tsquery from '@phenomnomnominal/tsquery';
import { EslintRuleGeneratorSchema } from './schema';
import { lintWorkspaceRuleGenerator } from '@nx/eslint/src/generators/workspace-rule/workspace-rule';

interface Options extends ReturnType<typeof normalizeSchema> {}

export async function eslintRuleGenerator(tree: Tree, schema: EslintRuleGeneratorSchema) {
  const options = normalizeSchema(schema);
  await lintWorkspaceRuleGenerator(tree, options);

  const project = readProjectConfiguration(tree, 'eslint-rules');
  replaceBoilerplateToUseOldTypescriptEslintSyntax(tree, { project, ...options });

  await formatFiles(tree);
}

export default eslintRuleGenerator;

function normalizeSchema(schema: EslintRuleGeneratorSchema) {
  return { ...schema, directory: schema.directory ?? 'rules' } as Required<EslintRuleGeneratorSchema>;
}

// TODO: remove this after we migrate to @typescript-eslint v5 which exposes utils package instead of experimental-utils
function replaceBoilerplateToUseOldTypescriptEslintSyntax(
  tree: Tree,
  options: Options & { project: ProjectConfiguration },
) {
  const ruleDir = joinPathFragments(options.project.root, options.directory);
  const paths = {
    impl: joinPathFragments(ruleDir, `${options.name}.ts`),
    spec: joinPathFragments(ruleDir, `${options.name}.spec.ts`),
  };

  const implContent = tree.read(paths.impl, 'utf-8') ?? '';
  const specContent = tree.read(paths.spec, 'utf-8') ?? '';

  const defaultImport = '@typescript-eslint/utils';
  const ourImport = '@typescript-eslint/experimental-utils';
  const IMPORT_AST_SELECTOR = `ImportDeclaration StringLiteral[value=${defaultImport}]`;

  const updatedSpecContent = tsquery.replace(specContent, IMPORT_AST_SELECTOR, () => {
    return `'${ourImport}'`;
  });

  let updatedImplContent = tsquery.replace(implContent, IMPORT_AST_SELECTOR, () => {
    return `'${ourImport}'`;
  });
  updatedImplContent = tsquery.replace(
    updatedImplContent,
    'ObjectLiteralExpression PropertyAssignment Identifier[name=docs] ~ ObjectLiteralExpression',
    () => {
      return `{
        category: 'Best Practices',
        description: \`\`,
        recommended: 'error',
      }`;
    },
  );

  tree.write(paths.impl, updatedImplContent);
  tree.write(paths.spec, updatedSpecContent);
}
