import type { Renderer, ProjectAnnotations } from '@storybook/types';

import { withFluentProvider } from '../decorators/withFluentProvider';
import { withReactStrictMode } from '../decorators/withReactStrictMode';
import { withAriaLive } from '../decorators/withAriaLive';
import { FluentDocsContainer, FluentDocsPage } from '../docs';

import { DIR_ID, STRICT_MODE_ID, THEME_ID } from '../constants';

export const decorators = [
  withFluentProvider,
  withAriaLive,
  withReactStrictMode,
] as ProjectAnnotations<Renderer>['decorators'];
export const globals = { [THEME_ID]: undefined, [DIR_ID]: undefined, [STRICT_MODE_ID]: undefined }; // allow theme to be set by URL query param

const preview: ProjectAnnotations<Renderer> = {
  decorators,
  globals,
  parameters: {
    docs: {
      container: FluentDocsContainer,
      page: FluentDocsPage,
    },
  },
};

export default preview;
