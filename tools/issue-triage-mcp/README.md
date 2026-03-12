# @fluentui/issue-triage-mcp

An MCP (Model Context Protocol) server that helps developers narrow down **which files and folders** in the FluentUI repository are most likely responsible for a given issue.

Describe the problem in plain English — mention component names, symptoms, and reproduction details — and the server returns a structured, prioritised list of files, folders, and investigation tips.

---

## What it does

Given a description like:

> "The Dialog is not dismissing when pressing Escape and the focus is not returning to the trigger button"

The server will:

1. **Detect issue categories** — accessibility, interaction/event handling, focus management
2. **Detect the component** — Dialog → `packages/react-components/react-dialog/src`
3. Return **primary files** (most likely culprits), **primary folders**, **related folders**, and **step-by-step investigation tips**

---

## Issue categories supported

| Category | Example keywords |
|---|---|
| Performance | slow, lag, memory leak, re-render, infinite loop |
| Layout / Alignment | alignment, overflow, margin, gap, z-index, sticky |
| Visual / Styling | color, dark mode, theme, token, CSS, high contrast |
| Localization / i18n | translation, i18n, RTL, aria-label, locale |
| Accessibility | a11y, aria, screen reader, focus, keyboard, WCAG |
| Interaction / Events | click, hover, event not firing, callback, dismiss |
| State / Logic | crash, undefined, state not updating, blank screen |
| Animation / Transition | fade, slide, prefers-reduced-motion, keyframe |
| Responsive / Mobile | breakpoint, mobile, viewport, touch, cross-browser |
| Testing | jest, snapshot, storybook, visual regression, flaky |
| Build / TypeScript | type error, cannot find module, circular dependency |
| Popover / Overlay | popup, portal, tooltip, positioning, collision |
| Form / Input | validation, controlled, required, placeholder |
| Data Display | table, tree, virtualizer, sorting, row selection |

---

## Tools exposed

### `triage_issue`

```
Input:
  description  string   Free-text description of the issue (required, min 5 chars)
  repoRoot     string   Path to the repo root (optional, default ".")

Output:
  Markdown-formatted triage report with:
  - Issue categories detected
  - Components detected
  - Primary files (most likely culprits)
  - Primary folders
  - Related / supporting folders
  - Investigation steps & tips
  - Confidence note
```

---

## Building

```bash
cd tools/issue-triage-mcp
npm install
npm run build
```

## Running

```bash
node dist/index.js
```

Or via npx after publishing:

```bash
npx @fluentui/issue-triage-mcp
```

## Registering with an MCP client

Add to your MCP client configuration (e.g. `mcp.json`):

```json
{
  "mcpServers": {
    "issue-triage": {
      "command": "node",
      "args": ["./tools/issue-triage-mcp/dist/index.js"]
    }
  }
}
```

Or with Claude Desktop (`~/.config/claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "fluentui-issue-triage": {
      "command": "node",
      "args": ["/absolute/path/to/fluentui/tools/issue-triage-mcp/dist/index.js"]
    }
  }
}
```

---

## Architecture

```
tools/issue-triage-mcp/
├── src/
│   ├── index.ts                      # MCP server entry point
│   ├── tools/
│   │   ├── index.ts                  # Tool registry
│   │   └── triageIssue.ts            # Main triage tool logic
│   └── matchers/
│       ├── issuePatterns.ts          # Issue categories → folders/files/notes
│       └── componentMap.ts           # Component names → package paths/key files
├── package.json
├── tsconfig.json
└── README.md
```

### Adding new issue categories

Edit [`src/matchers/issuePatterns.ts`](src/matchers/issuePatterns.ts) and add a new entry to the `ISSUE_CATEGORIES` array.

### Adding new components

Edit [`src/matchers/componentMap.ts`](src/matchers/componentMap.ts) and add a new entry to `COMPONENT_MAP`.

### Adding keyword-specific overrides

Edit the `applyKeywordOverrides` function in [`src/tools/triageIssue.ts`](src/tools/triageIssue.ts) to handle any keyword that needs very targeted file/step suggestions beyond what category matching provides.
