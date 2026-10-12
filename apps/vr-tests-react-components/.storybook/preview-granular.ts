import type { Preview } from '@storybook/react-webpack5';
import { withFluentProvider } from '../../../packages/react-components/react-storybook-addon/src/decorators/withFluentProvider';
import { withAriaLive } from '../../../packages/react-components/react-storybook-addon/src/decorators/withAriaLive';
import { withReactStrictMode } from '../../../packages/react-components/react-storybook-addon/src/decorators/withReactStrictMode';
import {
  DIR_ID,
  STRICT_MODE_ID,
  THEME_ID,
} from '../../../packages/react-components/react-storybook-addon/src/constants';

export const decorators = [withFluentProvider, withAriaLive, withReactStrictMode] as Preview['decorators'];
export const initialGlobals = { [THEME_ID]: undefined, [DIR_ID]: undefined, [STRICT_MODE_ID]: undefined };
