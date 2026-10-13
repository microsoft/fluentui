import type { Preview } from '@storybook/react-webpack5';
import { withFluentProvider } from '../../../packages/react-components/react-storybook-addon/src/decorators/withFluentProvider';
import { DIR_ID, THEME_ID } from '../../../packages/react-components/react-storybook-addon/src/constants';

export const decorators = [withFluentProvider] as Preview['decorators'];
export const initialGlobals = { [THEME_ID]: undefined, [DIR_ID]: undefined };
