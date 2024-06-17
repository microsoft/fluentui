import { ComponentMeta } from '@storybook/react';
import { SwatchPicker, ColorSwatch, ImageSwatch, SwatchPickerRow, EmptySwatch } from '@fluentui/react-components';

import descriptionMd from './SwatchPickerDescription.md';
import bestPracticesMd from './SwatchPickerBestPractices.md';

export { Default } from './SwatchPickerDefault.stories';
export { SwatchPickerSize } from './SwatchPickerSize.stories';
export { SwatchPickerShape } from './SwatchPickerShape.stories';
export { SwatchPickerLayout } from './SwatchPickerLayout.stories';
export { SwatchPickerSpacing } from './SwatchPickerSpacing.stories';
export { SwatchPickerImage } from './SwatchPickerImage.stories';
export { EmptySwatchExample } from './EmptySwatch.stories';
export { ColorSwatchVariants } from './ColorSwatchVariants.stories';
export { SwatchPickerMixedSwatches } from './SwatchPickerMixedSwatches.stories';
export { SwatchPickerWithTooltip } from './SwatchPickerWithTooltip.stories';
export { SwatchPickerPopup } from './SwatchPickerPopup.stories';

const metadata: ComponentMeta<typeof SwatchPicker> = {
  title: 'Components/SwatchPicker',
  component: SwatchPicker,
  subcomponents: {
    ColorSwatch,
    SwatchPickerRow,
    ImageSwatch,
    EmptySwatch,
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
