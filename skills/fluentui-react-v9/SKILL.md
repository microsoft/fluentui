---
name: fluentui-react-v9
description: Documentation for Fluent UI React v9 (@fluentui/react-components) - Microsoft's React component library. Use when building React apps with Fluent UI, implementing Microsoft Fluent Design, working with @fluentui/react-components package, migrating from v8 or v0, customizing themes/styling, setting up SSR (Next.js/Remix), or implementing accessible React components following WCAG 2.1 AA standards.
---

# Fluent UI React v9 Skill

This skill provides comprehensive documentation for Fluent UI React v9 with 100+ React components, theming, accessibility, and migration guides.

**Package**: `@fluentui/react-components`

## Quick Reference

Install: `npm install @fluentui/react-components`

Basic usage:

```tsx
import { FluentProvider, webLightTheme, Button } from '@fluentui/react-components';
<FluentProvider theme={webLightTheme}>
  <Button appearance="primary">Click me</Button>
</FluentProvider>;
```

## How to Find Documentation

Reference files live in: `references/`

Files are organized by category. Follow this workflow to find what you need:

### Step 1: Identify the Category

**Components** (`components-*`) - Specific UI components (Button, Dialog, Menu, Table, etc.)
**Compat components** (`compat-components-*`) - Legacy-compat wrappers (Calendar, DatePicker, TimePicker)
**Concepts** (`concepts-*`) - Core topics (styling, theming, SSR, accessibility)
**Migration** (`concepts-migration-*`) - Guides for migrating from v8 or v0
**Utilities** (`utilities-*`) - Helper functions and hooks
**Motion** (`motion-*`) - Animation and transition components
**Theme** (`theme-*`) - Design tokens (colors, spacing, typography, etc.)
**Icons** (`icons-*`) - Icon library usage

### Step 2: Find the Right File with Glob

Use the **Glob** tool to find files by name. All files follow the pattern:
`references/{category-name}.md`

**For a specific component:**

```
Glob pattern: "references/components-button*.md"
→ Returns: components-button-button.md, components-button-compoundbutton.md, ...
```

**For a concept by topic:**

```
Glob pattern: "references/concepts-developer-theming.md"
Glob pattern: "references/concepts-developer-styling*.md"
```

**For migration guides:**

```
Glob pattern: "references/concepts-migration-from-v8*.md"
Glob pattern: "references/concepts-migration-from-v8-components-button*.md"
```

**To list all files in a category:**

```
Glob pattern: "references/utilities-*.md"
```

### Step 3: Read the Documentation

Once you have the file path, use the Read tool to load it. Each file contains:

- API reference with props, types, and defaults
- Code examples showing common patterns
- Best practices and accessibility guidelines
- Links to related documentation

### Step 4: If the File Is Not Found

If Glob returns no results:

1. Try name variations: plural/singular, abbreviations (e.g., `radiogroup` vs `radio-group`)
2. Use Grep with `path: "references"` and `output_mode: "files_with_matches"` to search file content for the term
3. Check the "Working with AI" guide: `references/concepts-developer-working-with-ai.md`

### Online Documentation (Fallback)

Documentation is also available online (updated with each release):

**Comprehensive index**: https://storybooks.fluentui.dev/react/llms.txt

**Individual pages**: https://storybooks.fluentui.dev/react/llms/{filename}.md

- Example: https://storybooks.fluentui.dev/react/llms/components-button-button.md

Prefer local files (Glob + Read) for speed. Use WebFetch only when local files are unavailable or you need to verify the latest version.

## Common Documentation Paths

> For each name below, the full file path is `references/{name}.md`

**Styling and Theming:**

- Styling components: `concepts-developer-styling-components`
- Theming system: `concepts-developer-theming`
- Advanced styling: `concepts-developer-advanced-styling-techniques`
- Design tokens: Use Grep for "design tokens" or "theme tokens"

**Server-Side Rendering:**

- Next.js App Router: `concepts-developer-server-side-rendering-next-js-appdir-setup`
- Next.js Pages: `concepts-developer-server-side-rendering-next-js-pages-setup`
- Remix/React Router: `concepts-developer-server-side-rendering-react-router-7-and-remix-setup`

**Accessibility:**

- Overview: `concepts-developer-accessibility-components-overview`
- Focus indicators: `concepts-developer-accessibility-focus-indicator`
- Component labelling: `concepts-developer-accessibility-component-labelling`
- Per-component: `concepts-developer-accessibility-components-{name}`

**Migration from v8:**

- Component mapping: `concepts-migration-from-v8-component-mapping`
- Color mapping: `concepts-migration-from-v8-color-mapping`
- Specific component: `concepts-migration-from-v8-components-{name}-migration`

**Migration from v0 (Northstar):**

- Specific component: `concepts-migration-from-v0-components-{name}-migration`

## Frequently Used Components

Use Glob with `references/components-{name}*.md` to find any of these:

| User mentions                                     | Glob pattern fragment                                                                      |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Button, CompoundButton, SplitButton, ToggleButton | `components-button*`                                                                       |
| Input, Textarea, SearchBox, SpinButton            | `components-input`, `components-textarea`, `components-searchbox`, `components-spinbutton` |
| Dialog                                            | `components-dialog`                                                                        |
| Menu, MenuList                                    | `components-menu*`                                                                         |
| Dropdown, Combobox, Select                        | `components-dropdown`, `components-combobox`, `components-select`                          |
| Checkbox, Switch                                  | `components-checkbox`, `components-switch`                                                 |
| Radio, RadioGroup                                 | `components-radiogroup`                                                                    |
| Table, DataGrid                                   | `components-table`, `components-datagrid`                                                  |
| Accordion                                         | `components-accordion`                                                                     |
| Avatar, AvatarGroup                               | `components-avatar*`                                                                       |
| Badge, CounterBadge, PresenceBadge                | `components-badge*`                                                                        |
| Card, CardHeader, CardFooter                      | `components-card*`                                                                         |
| Tabs, TabList                                     | `components-tablist`                                                                       |
| Tag, TagGroup, TagPicker                          | `components-tag*`, `components-tagpicker`                                                  |
| Toast                                             | `components-toast`                                                                         |
| Toolbar                                           | `components-toolbar`                                                                       |
| Tooltip                                           | `components-tooltip`                                                                       |
| Tree                                              | `components-tree`                                                                          |
| MessageBar                                        | `components-messagebar`                                                                    |
| Popover                                           | `components-popover`                                                                       |
| Divider, Label, Link, Spinner, Skeleton           | `components-{name}` (exact match)                                                          |

## Important Principles

**Always wrap apps in FluentProvider** - Required for theme context
**Use built-in variants first** - Check `appearance`, `size`, `shape` props before custom styling
**Maintain accessibility** - All components are WCAG 2.1 AA compliant by default
**Use design tokens** - Reference theme tokens instead of hard-coding colors
