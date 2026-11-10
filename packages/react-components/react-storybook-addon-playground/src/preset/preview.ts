import type { Preview } from '@storybook/react-webpack5';

import { withOpenInPlaygroundButton } from '../decorators/withOpenInPlaygroundButton';
import { PlaygroundCanvas } from '../docs/PlaygroundCanvas';

export const decorators = [withOpenInPlaygroundButton] as Preview['decorators'];
export const parameters: Preview['parameters'] = {
  docs: {
    components: {
      Canvas: PlaygroundCanvas,
    },
  },
};
