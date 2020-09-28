import * as React from 'react';
import { RatingBasicExample } from './Rating.Basic.Example';

import { IDocPageProps } from '@fluentui/react-next/lib/common/DocPage.types';
import { RatingButtonControlledExample } from './Rating.ButtonControlled.Example';

const RatingBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-next/Rating/Rating.Basic.Example.tsx') as string;
const RatingButtonControlledExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-next/Rating/Rating.ButtonControlled.Example.tsx') as string;

export const RatingPageProps: IDocPageProps = {
  title: 'Rating',
  componentName: 'Rating',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/7.0/packages/react-next/src/components/Rating',
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
  overview: require<string>('!raw-loader!@fluentui/react-examples/src/react-next/Rating/docs/RatingOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/react-next/Rating/docs/RatingBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
