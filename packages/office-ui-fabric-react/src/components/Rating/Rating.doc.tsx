import * as React from 'react';
import { RatingBasicExample } from './examples/Rating.Basic.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { RatingButtonControlledExample } from './examples/Rating.ButtonControlled.Example';

const RatingBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Rating/examples/Rating.Basic.Example.tsx') as string;
const RatingButtonControlledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Rating/examples/Rating.ButtonControlled.Example.tsx') as string;

export const RatingPageProps: IDocPageProps = {
  title: 'Rating',
  componentName: 'Rating',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Rating',
  examples: [
    {
      title: 'Rating',
      code: RatingBasicExampleCode,
      view: <RatingBasicExample />,
    },
    {
      title: 'Button Controlled Rating',
      code: RatingButtonControlledExampleCode,
      view: <RatingButtonControlledExample />,
    },
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Rating/docs/RatingOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!office-ui-fabric-react/src/components/Rating/docs/RatingBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
