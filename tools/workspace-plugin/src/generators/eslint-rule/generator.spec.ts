import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration, joinPathFragments } from '@nx/devkit';
import { lintWorkspaceRulesProjectGenerator } from '@nx/eslint/src/generators/workspace-rules-project/workspace-rules-project';

import { eslintRuleGenerator } from './generator';
import { EslintRuleGeneratorSchema } from './schema';

describe('eslint-rule generator', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};
  let tree: Tree;
  const options: EslintRuleGeneratorSchema = { name: 'uppercase' };

  beforeEach(async () => {
    jest.spyOn(console, 'info').mockImplementation(noop);
    tree = createTreeWithEmptyWorkspace();
    await lintWorkspaceRulesProjectGenerator(tree, {});
  });

  it('should generate new eslint rule', async () => {
    const config = readProjectConfiguration(tree, 'eslint-rules');
    const paths = {
      impl: joinPathFragments(config.root, 'rules/uppercase.ts'),
      spec: joinPathFragments(config.root, 'rules/uppercase.spec.ts'),
    };

    await eslintRuleGenerator(tree, options);

    expect(tree.read(paths.impl, 'utf-8')).toMatchInlineSnapshot(`
      "/**
       * This file sets you up with structure needed for an ESLint rule.
       *
       * It leverages utilities from @typescript-eslint to allow TypeScript to
       * provide autocompletions etc for the configuration.
       *
       * Your rule's custom logic will live within the create() method below
       * and you can learn more about writing ESLint rules on the official guide:
       *
       * https://eslint.org/docs/developer-guide/working-with-rules
       *
       * You can also view many examples of existing rules here:
       *
       * https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/src/rules
       */

      import { ESLintUtils } from '@typescript-eslint/utils';

      // NOTE: The rule will be available in ESLint configs as \\"@nx/workspace-uppercase\\"
      export const RULE_NAME = 'uppercase';

      export const rule = ESLintUtils.RuleCreator(() => __filename)({
        name: RULE_NAME,
        meta: {
          type: 'problem',
          docs: {
            description: \`\`,
            recommended: 'recommended',
          },
          schema: [],
          messages: {},
        },
        defaultOptions: [],
        create(context) {
          return {};
        },
      });
      "
    `);

    expect(tree.read(paths.spec, 'utf-8')).toMatchInlineSnapshot(`
      "import { TSESLint } from '@typescript-eslint/utils';
      import { rule, RULE_NAME } from './uppercase';

      const ruleTester = new TSESLint.RuleTester({
        parser: require.resolve('@typescript-eslint/parser'),
      });

      ruleTester.run(RULE_NAME, rule, {
        valid: [\`const example = true;\`],
        invalid: [],
      });
      "
    `);
  });
});
