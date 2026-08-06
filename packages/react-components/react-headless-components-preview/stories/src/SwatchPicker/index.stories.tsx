import * as React from 'react';
import {
  ColorSwatch,
  EmptySwatch,
  ImageSwatch,
  SwatchPicker,
  SwatchPickerRow,
} from '@fluentui/react-headless-components-preview/swatch-picker';
import descriptionMd from './SwatchPickerDescription.md';
import styles from './swatch-picker.module.css';

export { Default } from './SwatchPickerDefault.stories';
export { EmptySwatchExample } from './SwatchPickerEmpty.stories';
export { Grid } from './SwatchPickerGrid.stories';
export { ImageSwatchExample } from './SwatchPickerImage.stories';

export default {
  title: 'Components/SwatchPicker',
  component: SwatchPicker,
  subcomponents: { ColorSwatch, EmptySwatch, ImageSwatch, SwatchPickerRow },
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
  decorators: [
    (Story: React.ComponentType): React.ReactNode => (
      <div className={styles.story}>
        <Story />
      </div>
    ),
  ],
};
