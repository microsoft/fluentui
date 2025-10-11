import { RULE_NAME as noRestrictedGlobalsName, rule as noRestrictedGlobals } from './rules/no-restricted-globals';
import { RULE_NAME as noMissingJsxPragmaName, rule as noMissingJsxPragma } from './rules/no-missing-jsx-pragma';
import {
  RULE_NAME as consistentCallbackTypeName,
  rule as consistentCallbackType,
} from './rules/consistent-callback-type';
import { RULE_NAME as enforceUseClientName, rule as enforceUseClient } from './rules/enforce-use-client';

/**
 * Import your custom workspace rules at the top of this file.
 *
 * For example:
 *
 * import { RULE_NAME as myCustomRuleName, rule as myCustomRule } from './rules/my-custom-rule';
 *
 * In order to quickly get started with writing rules you can use the
 * following generator command and provide your desired rule name:
 *
 * ```sh
 * npx nx g nx g @fluentui/workspace-plugin:eslint-rule {{ NEW_RULE_NAME }}
 * ```
 */

module.exports = {
  /**
   * Apply the imported custom rules here.
   *
   * For example (using the example import above):
   *
   * rules: {
   *  [myCustomRuleName]: myCustomRule
   * }
   */
  rules: {
    [consistentCallbackTypeName]: consistentCallbackType,
    [noRestrictedGlobalsName]: noRestrictedGlobals,
    [noMissingJsxPragmaName]: noMissingJsxPragma,
    [enforceUseClientName]: enforceUseClient,
  },
};
