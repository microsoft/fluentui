# Accessibility Issue Fixing Prompt

**Context:**
You are tasked with fixing an accessibility issue in the charts component of the Fluent UI library and validate it.

**Instructions:**

### Step 1: Bug Context Gathering

- Take the concerned project name , package name and bug id from the user.
- Use the ADO MCP Server to gather all relevant context for the bug/work item with the given ID.
- Ensure you understand the nature of the bug, its impact on accessibility, and any related user stories or acceptance criteria.

### Step 2: Fix Implementation

- Explain the root cause and target component of the bug to the user.
- fix the bug and focus only on the solution of given bug. don't add extra things.
- Ensure that the fix adheres to accessibility standards, such as WCAG 2.1.
- Implement the fix in the appropriate package directory. For example, if the bug is in the v9 charting components, work in `packages/charts/react-charts/library`.
- For reference, you can refer the `packages/charts/react-charting/src` folder which holds the v8 version of charts. Don't change any code in this folder.

### Step 3: Validation using Playwright MCP

3. validate the bug using playwright MCP. Follow the following steps for this validation:
   - Refer package.json in `packages/charts/react-charts` to run the storybook localhost server with port `64044` and ensure it is running. Use that localhost server link only to validate the bug using playwright MCP.
   - Navigate to the localhost link running in background in terminal and go to specific chart story in Storybook.
   - Wait for the chart to fully render.
   - First enumerate all the test cases that you will run to validate the fix. Also tell me the action and validation steps for each test case.
   - Run each test case using Playwright MCP.
     **For each test case:**
     - Ensure that focus states are visible and accessible.
     - Validate that all interactive elements are reachable and operable via keyboard navigation.
     - Check for any ARIA attributes that may need to be added or modified to enhance accessibility.
     - Capture screenshots of the chart after every tab key with focus states to validate accessibility.
   - Ensure that the fix does not introduce any new issues or regressions in the charting components.
