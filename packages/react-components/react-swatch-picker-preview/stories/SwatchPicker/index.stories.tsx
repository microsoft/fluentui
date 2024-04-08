import { ComponentMeta } from '@storybook/react';
import { SwatchPicker, ColorSwatch, ImageSwatch, SwatchPickerRow } from '@fluentui/react-swatch-picker-preview';

import descriptionMd from './SwatchPickerDescription.md';
import bestPracticesMd from './SwatchPickerBestPractices.md';

export { Default } from './SwatchPickerDefault.stories';
export { SwatchPickerImage } from './SwatchPickerImage.stories';
export { ColorSwatchVariants } from './ColorSwatchVariants.stories';
export { SwatchPickerWithTooltip } from './SwatchPickerWithTooltip.stories';
export { SwatchPickerLayout } from './SwatchPickerLayout.stories';
export { SwatchPickerSize } from './SwatchPickerSize.stories';
export { SwatchPickerSpacing } from './SwatchPickerSpacing.stories';
export { SwatchPickerShape } from './SwatchPickerShape.stories';
export { SwatchPickerPopup } from './SwatchPickerPopup.stories';

const metadata: ComponentMeta<typeof SwatchPicker> = {
  title: 'Preview Components/SwatchPicker',
  component: SwatchPicker,
  subcomponents: {
    ColorSwatch,
    ImageSwatch,
    SwatchPickerRow,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};

export default metadata;
