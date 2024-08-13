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

// Typing with Meta<typeof SwatchPicker> generates a type error for the `subcomponents` property.
// https://github.com/storybookjs/storybook/issues/27535
//
// TODO: bring back typing when the issue is resolved
const metadata = {
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
