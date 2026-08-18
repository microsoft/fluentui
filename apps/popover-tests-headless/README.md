# @fluentui/popover-tests-headless

Private test application for the Headless adaptive positioning runtime.

The app exercises both positioning implementations behind the same component
APIs:

- native HTML Popover API with CSS Anchor Positioning;
- native HTML Popover API with lazy `react-positioning` fallback.

No Playwright tests are included yet. The initial workflow is manual
verification, followed by Playwright coverage after the scenarios are approved.

## CSR manual verification

Start the private Storybook from the repository root:

```bash
yarn nx storybook popover-tests-headless
```

Each anchored control has its own page under **Positioning Runtime / CSR**:

| Control         | Story URL                                                |
| --------------- | -------------------------------------------------------- |
| Popover         | `?path=/story/positioning-runtime-csr--popover`          |
| TeachingPopover | `?path=/story/positioning-runtime-csr--teaching-popover` |
| Menu            | `?path=/story/positioning-runtime-csr--menu`             |
| Tooltip         | `?path=/story/positioning-runtime-csr--tooltip`          |
| Dropdown        | `?path=/story/positioning-runtime-csr--dropdown`         |
| Combobox        | `?path=/story/positioning-runtime-csr--combobox`         |
| TagPicker       | `?path=/story/positioning-runtime-csr--tag-picker`       |

Every CSR page provides reload controls for:

- auto-detected mode;
- forced native mode;
- forced fallback mode.

The Popover page includes basic, nested, and collision-placement scenarios.
Stable `data-testid` hooks are included for future Playwright tests.

## SSR verification

Run the SSR harness:

```bash
yarn nx run popover-tests-headless:test-ssr
```

Each control also has a separate **Positioning Runtime / SSR** page:

| Control         | Story URL                                                |
| --------------- | -------------------------------------------------------- |
| Popover         | `?path=/story/positioning-runtime-ssr--popover`          |
| TeachingPopover | `?path=/story/positioning-runtime-ssr--teaching-popover` |
| Menu            | `?path=/story/positioning-runtime-ssr--menu`             |
| Tooltip         | `?path=/story/positioning-runtime-ssr--tooltip`          |
| Dropdown        | `?path=/story/positioning-runtime-ssr--dropdown`         |
| Combobox        | `?path=/story/positioning-runtime-ssr--combobox`         |
| TagPicker       | `?path=/story/positioning-runtime-ssr--tag-picker`       |

The SSR harness server-renders every story, then loads the generated output in
Chrome to catch browser and hydration errors. The SSR Storybook pages mirror
those scenarios and expose the hydration runtime controls for manual
inspection.

Every SSR page reports:

- server render mode: always `ssr`;
- requested hydration runtime: auto, native, or fallback;
- runtime resolved by the hydrated client.

The hydration runtime buttons use the same `positioningRuntime` query parameter
as the CSR pages. They do not change the server render mode. In auto mode,
hydration keeps native anchor positioning on supported browsers and only loads
the fallback on unsupported browsers.
