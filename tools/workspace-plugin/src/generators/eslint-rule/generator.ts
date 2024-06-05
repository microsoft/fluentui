import { formatFiles, Tree } from '@nx/devkit';
import { EslintRuleGeneratorSchema } from './schema';
import { lintWorkspaceRuleGenerator } from '@nx/eslint/src/generators/workspace-rule/workspace-rule';

export async function eslintRuleGenerator(tree: Tree, schema: EslintRuleGeneratorSchema) {
  const options = normalizeSchema(schema);
  await lintWorkspaceRuleGenerator(tree, options);

  await formatFiles(tree);
}

export default eslintRuleGenerator;

function normalizeSchema(schema: EslintRuleGeneratorSchema) {
  return { ...schema, directory: schema.directory ?? 'rules' } as Required<EslintRuleGeneratorSchema>;
}
