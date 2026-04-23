import { RuleTester } from '@typescript-eslint/rule-tester';
import { rule, RULE_NAME } from './no-unjustified-use-no-memo';

const ruleTester = new RuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    // Directive with justified comment — allowed
    {
      code: `
function useFoo() {
  'use no memo'; // justified: compiler causes runtime regression in edge case
  return useState(0);
}`,
    },
    // No directive at all — nothing to flag
    {
      code: `
function useFoo() {
  return useState(0);
}`,
    },
    // Regular string literal that is not 'use no memo'
    {
      code: `
function useFoo() {
  'use strict';
  return useState(0);
}`,
    },
    // Justified comment with extra whitespace
    {
      code: `
function useFoo() {
  'use no memo'; //   justified:   perf regression confirmed in profiling
  return useState(0);
}`,
    },
  ],
  invalid: [
    // Bare directive — no comment at all
    {
      code: `
function useFoo() {
  'use no memo';
  return useState(0);
}`,
      output: `
function useFoo() {
  return useState(0);
}`,
      errors: [{ messageId: 'missingJustification' }],
    },
    // Comment present but not a justification
    {
      code: `
function useFoo() {
  'use no memo'; // TODO: check if needed
  return useState(0);
}`,
      output: `
function useFoo() {
  return useState(0);
}`,
      errors: [{ messageId: 'missingJustification' }],
    },
    // justified: with no actual reason text
    {
      code: `
function useFoo() {
  'use no memo'; // justified:
  return useState(0);
}`,
      output: `
function useFoo() {
  return useState(0);
}`,
      errors: [{ messageId: 'missingJustification' }],
    },
    // Block comment instead of line comment
    {
      code: `
function useFoo() {
  'use no memo'; /* justified: some reason */
  return useState(0);
}`,
      output: `
function useFoo() {
  return useState(0);
}`,
      errors: [{ messageId: 'missingJustification' }],
    },
  ],
});
