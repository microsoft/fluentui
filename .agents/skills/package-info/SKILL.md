---
name: package-info
description: Quick lookup for a Fluent UI package — path, dependencies, owner team, Nx project details, and relevant docs
argument-hint: <package-name>
allowed-tools: Bash Read Grep Glob
---

# Package Info Lookup

Get a comprehensive overview of the package **$ARGUMENTS**.

## Steps

1. **Resolve the package path.** Map the name to a filesystem path:

   - `react-button` or `@fluentui/react-button` → `packages/react-components/react-button/`
   - Check both `library/` (source) and `stories/` (storybook) sub-packages

2. **Get Nx project details:**

   ```bash
   yarn nx show project @fluentui/$ARGUMENTS --json 2>/dev/null || yarn nx show project $ARGUMENTS --json 2>/dev/null
   ```

3. **Read the package.json** for version, dependencies, and peer dependencies.

4. **Check ownership** by searching CODEOWNERS:

   ```bash
   grep -i "$ARGUMENTS" CODEOWNERS
   ```

5. **Summarize the component structure** — list files under `library/src/components/`.

6. **Check test coverage** — does it have:

   - Unit tests (`*.test.tsx`)
   - Conformance tests (`testing/isConformant.ts`)
   - Stories (`stories/` package)

7. **Report** in this format:

   ```
   Package: @fluentui/<name>
   Path: packages/react-components/<name>/library/
   Version: x.y.z
   Tier: 3 (Component) | 2 (Foundation) | 1 (Core)
   Owner: <team from CODEOWNERS>
   Dependencies: <list relevant @fluentui deps>
   Components: <list exported components>
   Tests: unit ✓/✗ | conformance ✓/✗ | stories ✓/✗
   ```

## Useful Commands for the Package

```bash
yarn nx run <project>:build          # Build
yarn nx run <project>:test           # Unit tests
yarn nx run <project>:lint           # Lint
yarn nx run <project>:type-check     # Type check
yarn nx run <project>:generate-api   # Regenerate API docs (etc/*.api.md)
```

## References

- Package layers: [docs/architecture/layers.md](../../../docs/architecture/layers.md)
- Team routing: [docs/team-routing.md](../../../docs/team-routing.md)
