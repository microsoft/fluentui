import * as React from 'react';

import { IDocPageProps } from '@fluentui/react-internal/lib/common/DocPage.types';

import { CardVerticalExample } from './Card.Vertical.Example';
import { CardHorizontalExample } from './Card.Horizontal.Example';
import { CardConfigureExample } from './Card.Configure.Example';

const CardVerticalExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-cards/Card/Card.Vertical.Example.tsx') as string;
const CardHorizontalExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-cards/Card/Card.Horizontal.Example.tsx') as string;
const CardConfigureExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-cards/Card/Card.Configure.Example.tsx') as string;

export const CardPageProps: IDocPageProps = {
  title: 'Card',
  componentName: 'Card',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react-cards/src/components/Card',
  examples: [
    {
      title: 'Vertical Card',
      code: CardVerticalExampleCode,
      view: <CardVerticalExample />,
    },
    {
      title: 'Horizontal Card',
      code: CardHorizontalExampleCode,
      view: <CardHorizontalExample />,
    },
    {
      title: 'Configure Properties',
      code: CardConfigureExampleCode,
      view: <CardConfigureExample />,
    },
  ],
  overview: require<string>('!raw-loader!@fluentui/react-examples/src/react-cards/Card/docs/CardOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!@fluentui/react-examples/src/react-cards/Card/docs/CardDos.md'),
  donts: require<string>('!raw-loader!@fluentui/react-examples/src/react-cards/Card/docs/CardDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
