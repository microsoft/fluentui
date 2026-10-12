import type { Preview } from '@storybook/react-webpack5';

import { withOpenInPlaygroundButton } from '../decorators/withOpenInPlaygroundButton';

export const decorators = [withOpenInPlaygroundButton] as Preview['decorators'];
