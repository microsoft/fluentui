# @fluentui/popover-tests-headless

Private test application for the Headless overlay runtime.

The app exercises both implementations behind the same component APIs:

- native HTML Popover/Dialog and CSS Anchor Positioning;
- lazy Portal, Tabster, and `react-positioning` fallback.

No Playwright tests are included yet. The initial workflow is manual
verification, followed by Playwright coverage after the scenarios are approved.

## CSR manual verification

Start the private Storybook from the repository root:

```bash
yarn nx storybook popover-tests-headless
```

Each control has its own page under **Overlay Runtime / CSR**:

| Control  | Story URL                                    |
| -------- | -------------------------------------------- |
| Popover  | `?path=/story/overlay-runtime-csr--popover`  |
| Menu     | `?path=/story/overlay-runtime-csr--menu`     |
| Tooltip  | `?path=/story/overlay-runtime-csr--tooltip`  |
| Dropdown | `?path=/story/overlay-runtime-csr--dropdown` |
| Dialog   | `?path=/story/overlay-runtime-csr--dialog`   |
| Toast    | `?path=/story/overlay-runtime-csr--toast`    |

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

Each control also has a separate **Overlay Runtime / SSR** page:

| Control  | Story URL                                    |
| -------- | -------------------------------------------- |
| Popover  | `?path=/story/overlay-runtime-ssr--popover`  |
| Menu     | `?path=/story/overlay-runtime-ssr--menu`     |
| Tooltip  | `?path=/story/overlay-runtime-ssr--tooltip`  |
| Dropdown | `?path=/story/overlay-runtime-ssr--dropdown` |
| Dialog   | `?path=/story/overlay-runtime-ssr--dialog`   |
| Toast    | `?path=/story/overlay-runtime-ssr--toast`    |

The SSR harness renders each `*.stories.tsx` export without a browser. The same
pages can be opened in Storybook to inspect client hydration.

Every SSR page reports:

- server render mode: always `ssr`;
- requested hydration runtime: auto, native, or fallback;
- runtime resolved by the hydrated client.

The hydration runtime buttons use the same `overlayRuntime` query parameter as
the CSR pages. They do not change the server render mode.
