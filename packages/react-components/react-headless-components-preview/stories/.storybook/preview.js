import { polyfillBodyAndObserve } from '@microsoft/focusgroup-polyfill/shadowless';
import { parameters as reactArgTypesParameters } from '@storybook/react/dist/entry-preview-argtypes.mjs';

import * as rootPreview from '../../../../../.storybook/preview';

// Design tokens — loaded once for every story. Defines :root (light) and
// [data-theme="dark"] CSS custom properties consumed by all *.module.css files.
import './tokens.css';

// Custom docs page chrome and the tabbed source panel for CSS modules
import './headless-docs-page.css';
import { HeadlessDocsPage } from './HeadlessDocsPage';

// Browser-safe helper — import by direct subpath, not the package root
import { createStateDataAttributesExtractor } from '@fluentui/scripts-storybook/src/stateDataAttributesArgTypes';

polyfillBodyAndObserve();

const extractArgTypes = createStateDataAttributesExtractor(
  reactArgTypesParameters.docs.extractArgTypes,
  HEADLESS_STATE_DATA_ATTRIBUTES,
);

/** @type {typeof rootPreview.decorators} */
export const decorators = [...rootPreview.decorators];

/** @type {typeof rootPreview.parameters} */
export const parameters = {
  ...rootPreview.parameters,
  docs: {
    ...rootPreview.parameters.docs,
    page: HeadlessDocsPage,
    extractArgTypes,
  },
};

export const tags = ['autodocs'];
