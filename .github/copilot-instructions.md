## Repository Structure

Fluent UI is a **monorepo** managed with Yarn workspace.
It contains multiple packages, each with its own purpose and versioning strategy. The main packages of interest for charting components are:

Key structure:

- **`react-charting` (v8)** → Legacy charting components built on Fluent UI v8 styling & patterns.
- **`react-charts` (v9)** → Next-generation chart components based on Fluent UI v9, focusing on modern React patterns, hooks, and convergence goals.

## Build & Setup

### Step 1:

Install dependencies (from root):
run `yarn install`

### Step 2:

Go to the `packages/charts/react-charts` directory:
run `yarn build` to build the v9 charting components.

### Step 3:

Run the local Storybook server:
run `yarn start` to run the local Storybook server for the v9 charting components.
