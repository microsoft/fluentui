import { SwatchColorPikerCell } from '@fluentui/react-swatch-color-picker';

import descriptionMd from './SwatchColorPikerCellDescription.md';
import bestPracticesMd from './SwatchColorPikerCellBestPractices.md';

export { Default } from './SwatchColorPikerCellDefault.stories';

export default {
  title: 'Preview Components/SwatchColorPikerCell',
  component: SwatchColorPikerCell,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
