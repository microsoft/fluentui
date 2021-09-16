import * as React from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { Image } from '../index';
import type { Meta } from '@storybook/react';
import descriptionMd from './ImageDescription.md';
import bestPracticesMd from './ImageBestPractices.md';

export { Default } from './ImageDefault.stories';
export { ImageAppearanceShape } from './ImageApperanceShape.stories';
export { ImageBorderVariations } from './ImageBorderVariations.stories';
export { ImageFallback } from './ImageFallback.stories';
export { ImageFluid } from './ImageFluid.stories';
export { ImageLayoutFit } from './ImageLayoutFit.stories';

const useStackStyles = makeStyles({
  hStack: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 'calc(-1 * var(--gap, 8px) / 2)',
    '> *': {
      margin: 'calc(var(--gap, 8px) / 2)',
    },
  },
  vStack: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '> *:not(:first-child)': {
      marginTop: 'var(--gap, 20px)',
    },
  },
});
const Stack = (props: React.PropsWithChildren<{ horizontal?: boolean }>) => {
  const { horizontal, ...rest } = props;
  const { hStack, vStack } = useStackStyles();

  return <div {...rest} className={horizontal ? hStack : vStack} />;
};

export default {
  title: 'Components/Image',
  component: Image,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
  decorators: [
    Story => (
      <Stack horizontal>
        <Story />
      </Stack>
    ),
  ],
} as Meta;
