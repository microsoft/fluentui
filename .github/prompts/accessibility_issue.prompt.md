# Accessibility Issue Fixing Prompt (Generic)

**Context:**
You are tasked with fixing an accessibility issue in the given project and validating it thoroughly.

---

## Steps

### Step 1: Bug Context Gathering

- Take the concerned project name and bug id from the user.

- Use the ADO MCP Server to gather all relevant context for the bug/work item with the given ID.

---

### Step 2: FIX IMPLEMENTATION

1. Explain the root cause and target component of the bug to the user.
2. Implement the fix in the **target package or module** (provided by the user or derived from context).
3. Don't validate the issue at this stage; focus solely on implementing the fix.
4. Focus only on fixing the given bug:
   - Do not introduce unrelated changes.
   - Ensure no new bugs or syntax errors are introduced.
   - Ensure the fix adheres to **accessibility standards** (e.g., ARIA roles, aria-labels, keyboard navigation, screen reader support).

---

### Step 3: VALIDATION USING PLAYWRIGHT MCP AND A11Y-ACCESSIBILITY MCP

1. Take repo specific context of development commands from `fluent_charts.prompt.md` file to build and run the storybook server.
2. **Wait for the server to start**. Only after the server is up and running, use the localhost server running in terminal to validate the bug using Playwright MCP.
3. **Use the same terminal session** to:
   - Launch Playwright MCP.
   - Perform interactive accessibility validation.
   - Use A11Y-accessibility MCP for ARIA compliance.

---

### Step 4: SCREENSHOT CAPTURE AND ACCESSIBILITY SNAPSHOT

1. Capture **screenshots of the entire interactive component area**.
2. Ensure focus reaches the **interactive elements** (e.g., pressing Tab until focus reaches chart/controls).
3. Enumerate test cases before execution:
   - Include actions (e.g., tab navigation, screen reader attribute check).
   - Include validation steps (e.g., expected aria-label values).
4. Capture screenshots of:
   - Every tab stop within the interactive area.
   - Accessibility snapshots of ARIA attributes and labels.
5. Confirm no new accessibility regressions are introduced.

---

**Goal:** Fix and validate accessibility issues reliably across any repository or package.
