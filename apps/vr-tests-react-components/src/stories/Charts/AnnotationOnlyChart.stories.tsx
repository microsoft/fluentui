import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Steps, type StoryParameters } from 'storywright';
import { DARK_MODE, getStoryVariant, RTL, TestWrapperDecorator } from '../../utilities';
import { AnnotationOnlyChart } from '@fluentui/react-charts';
import type { AnnotationOnlyChartProps } from '@fluentui/react-charts';

export default {
  title: 'Charts/AnnotationOnlyChart',

  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: {
      steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof AnnotationOnlyChart>;

const annotations: AnnotationOnlyChartProps['annotations'] = [
  {
    id: 'annotation-1',
    text: 'First annotation',
    coordinates: { type: 'relative', x: 0.25, y: 0.25 },
  },
  {
    id: 'annotation-2',
    text: 'Second annotation with styling',
    coordinates: { type: 'relative', x: 0.6, y: 0.6 },
    style: {
      backgroundColor: '#fff4ce',
      textColor: '#323130',
    },
  },
];

const rootStyle = { width: '600px', height: '320px' };

export const Basic = () => {
  return (
    <div style={rootStyle}>
      <AnnotationOnlyChart annotations={annotations} width={600} height={300} />
    </div>
  );
};

export const BasicRTL = getStoryVariant(Basic, RTL);

export const BasicDarkMode = getStoryVariant(Basic, DARK_MODE);

/** Title + margin padding + plot/paper backgrounds — the inline-style channels. */
export const StyledWithTitle = () => {
  return (
    <div style={rootStyle}>
      <AnnotationOnlyChart
        annotations={annotations}
        chartTitle="Annotation only chart"
        description="Annotation only chart with styled surfaces"
        width={600}
        height={300}
        margin={{ t: 16, r: 12, b: 16, l: 12 }}
        plotBackgroundColor="#f3f2f1"
      />
    </div>
  );
};

export const StyledWithTitleRTL = getStoryVariant(StyledWithTitle, RTL);

export const StyledWithTitleDarkMode = getStoryVariant(StyledWithTitle, DARK_MODE);
