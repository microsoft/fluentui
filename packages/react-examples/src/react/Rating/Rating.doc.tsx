import * as React from 'react';
import { RatingBasicExample } from './Rating.Basic.Example';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';
import { RatingButtonControlledExample } from './Rating.ButtonControlled.Example';

const RatingBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Rating/Rating.Basic.Example.tsx') as string;
const RatingButtonControlledExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Rating/Rating.ButtonControlled.Example.tsx') as string;

export const RatingPageProps: IDocPageProps = {
  title: 'Rating',
  componentName: 'Rating',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/Rating',
  examples: [
    {
      title: 'Rating',
      code: RatingBasicExampleCode,
      view: <RatingBasicExample />,
    },
    {
      title: 'Button-controlled rating',
      code: RatingButtonControlledExampleCode,
      view: <RatingButtonControlledExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Rating/docs/RatingOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Rating/docs/RatingBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
