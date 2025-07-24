# Accessibility Issue Fixing Prompt

**Context:**
You are tasked with fixing an accessibility issue in the charts component of the Fluent UI library and validate it.

**Instructions:**

### Step 1: Bug Context Gathering

- Take the concerned package name and bug id from the user.
- Use the ADO MCP Server to gather all relevant context for the bug/work item with the given ID.
- Ensure you understand the nature of the bug, its impact on accessibility, and any related user stories or acceptance criteria.

### Step 2: Fix Implementation

- fix the bug and focus only on the solution of given bug. don't add extra things.
- Ensure that the fix adheres to accessibility standards, such as WCAG 2.1.
- Implement the fix in the appropriate package directory. For example, if the bug is in the v9 charting components, work in `packages/charts/react-charts`.
- For reference, you can refer the `packages/charts/react-charting` folder which holds the v8 version of charts.

3. validate the bug using playwright MCP. Follow the following steps for this validation:
   - Refer package.json in `packages/charts/react-charts` to run the storybook localhost server and ensure it is running.
   - Navigate to the localhost link running in background in terminal and go to specific chart story in Storybook.
   - Wait for the chart to fully render.
   - Use keyboard navigation to ensure that all interactive elements are accessible.
   - Capture screenshots of the chart with focus states to validate accessibility.
   - Ensure that the fix does not introduce any new issues or regressions in the charting components.
