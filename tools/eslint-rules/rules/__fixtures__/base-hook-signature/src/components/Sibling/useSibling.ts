// Docs-only stub fixture for `base-hook-signature.spec.ts`.
//
// The rule never reads this file's contents — `RuleTester` always feeds source code in-memory.
// This file exists purely so the fixture tree mirrors a real component folder layout:
//
//   Sibling/
//   ├── useSibling.ts      ← virtual filename used by tests
//   └── useSiblingBase.ts  ← MUST exist; rule does `fs.statSync` to detect the pair
//
// Tests that pass `filename: SIBLING_FILENAME` assert "when a base hook exists next to me,
// my signature is enforced".
export {};
