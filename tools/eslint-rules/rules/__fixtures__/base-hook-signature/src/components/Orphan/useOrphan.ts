// Docs-only stub fixture for `base-hook-signature.spec.ts`.
//
// The rule never reads this file's contents — `RuleTester` always feeds source code in-memory.
// This file exists purely so the fixture tree mirrors a real component folder layout:
//
//   Orphan/
//   └── useOrphan.ts  ← virtual filename used by tests
//
// Crucially, there is NO `useOrphanContextValuesBase.ts(x)` next to this file. That absence is
// the whole point: tests that pass `filename: ORPHAN_FILENAME` assert "when no paired base
// hook exists, the contract does NOT apply" — i.e. `useOrphanContextValues_unstable(state)`
// is a legitimate non-wrapping hook and must not be flagged.
export {};
