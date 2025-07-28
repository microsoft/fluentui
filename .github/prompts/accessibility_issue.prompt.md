# Accessibility Issue Fixing Prompt

**Context:**
You are tasked with fixing an accessibility issue in the charts component of the Fluent UI library and validate it.

**Instructions:**

### Step 1: Bug Context Gathering

- Take the concerned project name and bug id from the user.

- Use the ADO MCP Server to gather all relevant context for the bug/work item with the given ID.

- Ensure you understand the nature of the bug, its impact on accessibility, and any related user stories or acceptance criteria.

### Step 2: Fix Implementation

- Explain the root cause and target component of the bug to the user.

- fix the bug and focus only on the solution of given bug. don't add extra things.

- Don't introduce any extra bugs. fix all syntax errors before proceeding.

- Ensure that the fix adheres to accessibility standards, such as WCAG 2.1.

- Implement the fix in `packages/charts/react-charts/library` package. This package represents the v9 version of charts.

- For reference, you can refer the `packages/charts/react-charting/src` package which holds the v8 version of charts. Don't change any code in this folder.

### Step 3: Validation using Playwright MCP and a11y-accessibility MCP

validate the bug using playwright and a11y-accessibility MCP. Follow the following steps for this validation:

- Go to directory `packages/charts/react-charts/library` from root `fluentui` if not already there.

**Run all yarn commands from `packages/charts/react-charts/library` directory.**

- Refer package.json in `packages/charts/react-charts/library` to build the package. Solve build errors if any before proceeding.

- Refer package.json in `packages/charts/react-charts/library` to run the storybook localhost server and ensure it is running.

- **Wait for the server to start.** Only after the storybook is up and running, Use the **localhost server link running in terminal** to validate the bug using playwright MCP in the same terminal session. **Don't start a new terminal session.**

- Don't open a simple browser window. Use the Playwright MCP to run the tests.

- Wait for the chart to fully render.

### Step 4: Screenshot Capture and Accessibility Testing

**Capture every screenshot of entire page**

- **Click on the example story and in the interactive chart canvas area immediately** to ensure focus reaches to the chart controls. We don't want to test anything outside chart controls. Wait till control reaches interactive chart elements.

- First enumerate all the test cases that you will run to validate the fix. Also tell me the action and validation steps for each test case.

- Start validating the fix by capturing screenshots of the interactive chart elements using Playwright MCP. **Start capturing screenshots after focus reaches the interactive chart elements. Don't take screenshots before that of other components.**

- **Capture screenshots of entire chart canvas after each step** on pressing tab keys. Continue this process till control reaches outside the interactive chart elements.

- Check for any ARIA attributes that may need to be added or modified to enhance accessibility.
  **At the end, capture accessibility snapshot of the chart canvas to validate references of aria-labels**.

- Ensure that the fix does not introduce any new issues or regressions in the charting components.
