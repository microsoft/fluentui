import * as React from 'react';
import { RatingBasicExample } from './examples/Rating.Basic.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { RatingButtonControlledExample } from './examples/Rating.ButtonControlled.Example';

const RatingBasicExampleCode = require('!raw-loader!@fluentui/react-next/src/components/Rating/examples/Rating.Basic.Example.tsx') as string;
const RatingButtonControlledExampleCode = require('!raw-loader!@fluentui/react-next/src/components/Rating/examples/Rating.ButtonControlled.Example.tsx') as string;

export const RatingPageProps: IDocPageProps = {
  title: 'Rating',
  componentName: 'Rating',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react-next/src/components/Rating',
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
  overview: require<string>('!raw-loader!@fluentui/react-next/src/components/Rating/docs/RatingOverview.md'),
  bestPractices: require<string>('!raw-loader!@fluentui/react-next/src/components/Rating/docs/RatingBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
