# RFC: Clarify `_unstable` Naming Convention for Public APIs

---

**Contributors:** @dmytrokirpa

**Stakeholders:**

- Fluent UI React v9 maintainers
- Fluent UI consumers and library users
- Partner teams using Fluent UI components

**Date:** 2026-01-22

**Target end date for feedback:** 2026-02-15

---

## Summary

Deprecate and rename all public API exports with the `_unstable` suffix in stable packages. The current naming creates confusion about API stability guarantees and prevents introducing truly experimental features.

This RFC proposes three coordinated changes:

1. Remove the `_unstable` suffix from stable APIs
2. Maintain backward compatibility through deprecated re-exports
3. Reserve `UNSTABLE_` prefix exclusively for experimental features

## Background

Many Fluent UI React v9 stable packages export APIs with `_unstable` suffix (e.g., `useBadge_unstable`, `renderBadge_unstable`). **Currently, ~62 packages export ~1,300+ APIs with this suffix.** These APIs are documented, supported, and follow standard semantic versioning—making the naming misleading. The suffix suggests volatility but the APIs are treated as stable public APIs.

### Historical Context

The `_unstable` suffix was originally introduced to signal lower-level APIs or implementation details during v9's transition from preview to stable. However, as packages graduated to stable status, the suffix remained despite these APIs becoming public, documented, and subject to standard semver guarantees.

## Problem Statement

**Current Issues:**

1. **Misleading naming**: `_unstable` suggests APIs might change at any time, but they follow standard semver guarantees
2. **Blocked innovation**: No clear naming for truly experimental features that can change/be removed without notice
3. **Documentation confusion**: Requires explaining that `_unstable` doesn't mean unstable

**Goals:**

- Establish clear naming that reflects actual stability guarantees
- Enable truly experimental features without confusion
- Maintain backward compatibility during transition
- Provide tooling for smooth migration

**Is this a breaking change?** No—deprecated re-exports maintain full backward compatibility. The removal of deprecated exports in the next major release will be a breaking change, following standard major version semantics.

## Detailed Design or Proposal

### Implementation: Rename and Deprecate

For all exports in stable packages (packages marked as v9 stable, i.e., `packages/react-components/**/src/index.ts`):

**Step 1: Rename primary exports and add deprecated re-exports**

```typescript
// Before
export { useBadge_unstable, renderBadge_unstable, useBadgeStyles_unstable };

// After (new names)
export { useBadge, renderBadge, useBadgeStyles };

// Deprecated re-exports for backward compatibility
/**
 * @deprecated Use `useBadge` instead. Will be removed in the next major release.
 */
export const useBadge_unstable = useBadge;

/**
 * @deprecated Use `renderBadge` instead. Will be removed in the next major release.
 */
export const renderBadge_unstable = renderBadge;

/**
 * @deprecated Use `useBadgeStyles` instead. Will be removed in the next major release.
 */
export const useBadgeStyles_unstable = useBadgeStyles;
```

**Step 2: Update internal usages and documentation**

- Update all internal code to use new names
- Update JSDoc comments and Storybook stories to reference new names
- Update code examples, tutorials, and api.md files to use new names

### Migration Support

Provide automated codemod to help consumers migrate with minimal manual effort:

- **Command**: `npx @fluentui/codemods v9-remove-unstable-suffix`
- **Behavior**: Automatically finds and renames all `_unstable` imports and usages
- **Scope**: Works with both named imports and namespace imports across all Fluent UI packages
- **Output**: Generates a migration report showing all changes made
- **Safety**: Preserves code formatting and includes dry-run mode (`--dry-run` flag)

**Example transformations handled by codemod:**

```typescript
// Named imports
import { useBadge_unstable, renderBadge_unstable } from '@fluentui/react-badge';
// ↓ transforms to ↓
import { useBadge, renderBadge } from '@fluentui/react-badge';

// Namespace imports
import * as BadgeUtils from '@fluentui/react-badge';
const hook = BadgeUtils.useBadge_unstable; // ↓ updates reference ↓
const hook = BadgeUtils.useBadge;

// Function calls and type references
const [state] = useBadge_unstable(props);
// ↓ transforms to ↓
const [state] = useBadge(props);
```

**Note**: Detailed codemod implementation, testing strategy, and edge case handling will be covered in a separate RFC.

Automated tooling and a generous deprecation timeline minimize disruption for consumers during the migration.

### Communication Plan

- **Release notes**: Explain change, migration path, and deprecation timeline
- **Contribution guidelines**: Clarify when to use `UNSTABLE_` prefix vs clean names
- **Partner outreach**: Proactive notification to known heavy users before release

### Cleanup (Next Major Release)

- Remove all deprecated `_unstable` re-exports from package entry points
- Update MIGRATION.md with breaking changes documentation
- Final communication to remaining users on deprecated APIs

### Future Convention

**For truly experimental features, use `UNSTABLE_` prefix (all caps):**

```typescript
// Experimental feature - may change or be removed without notice
export const UNSTABLE_useExperimentalFeature = () => {
  /* ... */
};
```

**Why `UNSTABLE_` prefix over `_unstable` suffix:**

1. **Highly visible**: All-caps prefix is harder to miss
2. **Clear distinction**: No confusion with deprecated `_unstable` exports
3. **Industry precedent**: Aligns with React's `UNSAFE_` pattern
4. **Intentional friction**: Makes experimental usage explicit

**Criteria for `UNSTABLE_` prefix:**

- Explicitly documented as experimental
- May change or be removed in any version (including minor/patch)
- Not recommended for production use
- Should include migration path if stabilized or removed

**For stable packages (v9 and later):**

- All stable APIs have clean names without instability markers
- Internal APIs shouldn't be exported; use `@internal` JSDoc tag for documentation
- Public APIs should look and feel like first-class citizens

### Scope

**Affected**: All stable packages in `packages/react-components/` (~62 packages, ~1,300+ exports)

- Hooks: `useBadge_unstable` → `useBadge`
- Render functions: `renderBadge_unstable` → `renderBadge`
- Style hooks: `useBadgeStyles_unstable` → `useBadgeStyles`
- Types/Interfaces: Where `_unstable` suffix exists (less common, but should be renamed for consistency)

**Excluded**:

- Preview packages
- Internal implementation details not exported from package entry points
- Experimental features that are genuinely unstable

### Pros and Cons

**Pros:**

- **Clarity**: API names accurately reflect their stability guarantees, eliminating confusion
- **Unblocks innovation**: Clear path for truly experimental features without overloading existing conventions
- **Better DX**: Improved developer experience and discoverability—APIs look like first-class citizens
- **Backward compatible**: Deprecated re-exports ensure existing code continues to work
- **Industry alignment**: Follows common practices (React, Vue, Angular don't use `_unstable` for stable APIs)

**Cons:**

- **Migration effort**: Consumers need to update their code (mitigated by automated codemod)
- **Deprecation warnings**: Users will see warnings until they migrate
- **Temporary bloat**: Duplicate exports temporarily increase bundle size slightly (tree-shaking eliminates unused aliases)
- **Documentation updates**: Need to update all docs, examples, and tutorials
- **Transition confusion**: During deprecation period, both names coexist which may confuse some users

### Risk Mitigation

| Risk                                                                  | Mitigation                                                                            |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Consumers ignore deprecation warnings and break on next major release | Provide codemod, clear timeline, ESLint rule, proactive partner outreach              |
| Bundle size increase from duplicate exports                           | Tree-shaking eliminates unused aliases; impact is minimal and temporary               |
| Documentation fragmentation during transition                         | Update all docs immediately to show new names as primary                              |
| Confusion from coexisting names                                       | Mark old names as deprecated everywhere; IDE autocomplete should prioritize new names |

## Discarded Solutions

### Alternative 1: Do Nothing

This would leave confusion about API stability guarantees and continue blocking innovation. Users would remain uncertain whether `_unstable` APIs are safe to use in production, and the library cannot introduce new truly experimental features without conflicting with existing `_unstable` conventions.

### Alternative 2: Reuse `_unstable` suffix for experimental features

Carries legacy baggage and creates confusion during transition. Since existing `_unstable` APIs are stable and documented, repurposing the suffix for genuinely experimental features would contradict established expectations and invalidate existing documentation without clear migration guidance.

### Alternative 3: Use `_experimental` suffix

Still easy to miss in code and autocomplete, more verbose, and doesn't align with industry precedent. It also creates a third naming convention alongside cleaned-up names, adding rather than reducing cognitive load for developers.

### Alternative 4: Break in next major release only (no deprecation period)

Forces all changes at once, making migration much harder for consumers who would need to update everything simultaneously. A rapid cutover creates support burden and leaves no grace period for those with large codebases.

## Implementation Timeline

- **RFC Approval & Feedback**: 3 weeks (deadline: 2026-02-15)

  - Gather core maintainer consensus on approach
  - Finalize codemod RFC in parallel

- **Implementation**: v9.x release cycle (estimated 2026-03 to 2026-04)

  - Audit affected APIs and conduct per-package review
  - Implement renames and deprecated re-exports across all packages
  - Update internal usages, tests, and documentation
  - Release in v9.x stable version

- **Migration Period**: v9.x through next major release

  - Monitor adoption and address migration issues
  - Support partner teams and key consumers
  - Gather feedback on codemod effectiveness
  - Provide ongoing ESLint rule and documentation support

- **Cleanup (Next Major Release)**:
  - Remove all deprecated `_unstable` re-exports
  - Update MIGRATION.md with breaking changes
  - Final communication to any remaining users

**Dependencies**:

- Codemod RFC approval and parallel implementation
- Partner team coordination and readiness assessment

## Next Steps

If approved, actions will be:

1. **Gather feedback** through 2026-02-15
2. **Draft codemod RFC** as parallel workstream
3. **Assign DRI** for implementation tracking
4. **Create GitHub issue** with detailed implementation checklist
5. **Begin implementation** once all approvals are in place
