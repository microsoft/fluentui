// @ts-check

// Emits the shared Tailwind theme layer once per document (see the file's header).
// Required by every converted package's `*.module.css`.
import './tailwind-theme.css';

/** @type {import("@fluentui/react-storybook-addon").FluentParameters} */
export const parameters = {
  layout: 'none',
  mode: 'vr-test',
  reactStorybookAddon: {
    disabledDecorators: ['AriaLive'],
  },
};
