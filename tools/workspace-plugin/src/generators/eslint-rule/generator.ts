import { formatFiles, Tree, joinPathFragments, readProjectConfiguration, ProjectConfiguration } from '@nx/devkit';
import { EslintRuleGeneratorSchema } from './schema';
import { lintWorkspaceRuleGenerator } from '@nx/eslint/src/generators/workspace-rule/workspace-rule';
import * as tsquery from '@phenomnomnominal/tsquery';

export async function eslintRuleGenerator(tree: Tree, schema: EslintRuleGeneratorSchema) {
  const options = normalizeSchema(schema);
  await lintWorkspaceRuleGenerator(tree, options);

  const project = readProjectConfiguration(tree, 'eslint-rules');

  replaceBoilerplateToUseRuleTester(tree, { project, ...options });

  await formatFiles(tree);
}

export default eslintRuleGenerator;

function normalizeSchema(schema: EslintRuleGeneratorSchema) {
  return { ...schema, directory: schema.directory ?? 'rules' } as Required<EslintRuleGeneratorSchema>;
}

function replaceBoilerplateToUseRuleTester(
  tree: Tree,
  options: EslintRuleGeneratorSchema & { project: ProjectConfiguration },
) {
  const dir = joinPathFragments(options.project.root, options.directory ?? '');
  const specPath = joinPathFragments(dir, `${options.name}.spec.ts`);
  const content = tree.read(specPath, 'utf-8') ?? '';

  const IMPORT_SELECTOR = `:matches(ImportDeclaration):has(Identifier[name="TSESLint"]):has(StringLiteral[value=@typescript-eslint/utils])`;
  const TESTER_SELECTOR = `:matches(VariableStatement):has(Identifier[name="ruleTester"])`;

  let updatedSpecContent = tsquery.replace(content, IMPORT_SELECTOR, () => {
    return `import { RuleTester } from '@typescript-eslint/rule-tester'`;
  });

  updatedSpecContent = tsquery.replace(updatedSpecContent, TESTER_SELECTOR, () => {
    return `const ruleTester = new RuleTester()`;
  });

  tree.write(specPath, updatedSpecContent);
}
