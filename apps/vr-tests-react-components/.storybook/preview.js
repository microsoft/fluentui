// @ts-check

// Emits the shared Tailwind theme layer once per document (see the file's header).
// Required by every converted package's `*.module.css`. This app does not compose the root
// preview, so it imports the one shared entry directly.
import '../../../scripts/storybook/src/tailwind-theme.css';

/** @type {import("@fluentui/react-storybook-addon").FluentParameters} */
export const parameters = {
  layout: 'none',
  mode: 'vr-test',
  reactStorybookAddon: {
    disabledDecorators: ['AriaLive'],
  },
};
