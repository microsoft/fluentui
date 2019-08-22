import * as React from 'react';

import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';

import { CardVerticalExample } from './examples/Card.Vertical.Example';
import { CardCompactExample } from './examples/Card.Compact.Example';
import { CardConfigureExample } from './examples/Card.Configure.Example';

const CardVerticalExampleCode = require('!raw-loader!@uifabric/react-cards/src/components/Card/examples/Card.Vertical.Example.tsx') as string;
const CardCompactExampleCode = require('!raw-loader!@uifabric/react-cards/src/components/Card/examples/Card.Compact.Example.tsx') as string;
const CardConfigureExampleCode = require('!raw-loader!@uifabric/react-cards/src/components/Card/examples/Card.Configure.Example.tsx') as string;

export const CardPageProps: IDocPageProps = {
  title: 'Card',
  componentName: 'Card',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/react-cards/src/components/Card',
  examples: [
    {
      title: 'Vertical Card',
      code: CardVerticalExampleCode,
      view: <CardVerticalExample />
    },
    {
      title: 'Compact Card',
      code: CardCompactExampleCode,
      view: <CardCompactExample />
    },
    {
      title: 'Configure Properties',
      code: CardConfigureExampleCode,
      view: <CardConfigureExample />
    }
  ],
  overview: require<string>('!raw-loader!@uifabric/react-cards/src/components/Card/docs/CardOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!@uifabric/react-cards/src/components/Card/docs/CardDos.md'),
  donts: require<string>('!raw-loader!@uifabric/react-cards/src/components/Card/docs/CardDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
