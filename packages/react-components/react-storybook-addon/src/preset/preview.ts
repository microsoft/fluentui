import type { Preview } from '@storybook/react';

import { withFluentProvider } from '../decorators/withFluentProvider';
import { withReactStrictMode } from '../decorators/withReactStrictMode';
import { withAriaLive } from '../decorators/withAriaLive';
import { FluentDocsContainer, FluentDocsPage } from '../docs';

import { DIR_ID, STRICT_MODE_ID, THEME_ID } from '../constants';

export const decorators = [withFluentProvider, withAriaLive, withReactStrictMode] as Preview['decorators'];

export const initialGlobals = { [THEME_ID]: undefined, [DIR_ID]: undefined, [STRICT_MODE_ID]: undefined }; // allow theme to be set by URL query param

const preview: Preview = {
  decorators,
  initialGlobals,
  parameters: {
    docs: {
      container: FluentDocsContainer,
      page: FluentDocsPage,
    },
  },
};

export default preview;
