import * as React from 'react';
import { TeachingBubbleBasicExample } from './TeachingBubble.Basic.Example';
import { TeachingBubbleWideExample } from './TeachingBubble.Wide.Example';
import { IDocPageProps } from '@fluentui/react-next/lib/common/DocPage.types';
import { TeachingBubbleCondensedExample } from './TeachingBubble.Condensed.Example';
import { TeachingBubbleIllustrationExample } from './TeachingBubble.Illustration.Example';
import { TeachingBubbleWideIllustrationExample } from './TeachingBubble.WideIllustration.Example';
import { TeachingBubbleSmallHeadlineExample } from './TeachingBubble.SmallHeadline.Example';
import { TeachingBubbleMultiStepExample } from './TeachingBubble.MultiStep.Example';

const TeachingBubbleBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-next/TeachingBubble/TeachingBubble.Basic.Example.tsx') as string;
const TeachingBubbleWideExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-next/TeachingBubble/TeachingBubble.Wide.Example.tsx') as string;
const TeachingBubbleCondensedExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-next/TeachingBubble/TeachingBubble.Condensed.Example.tsx') as string;
const TeachingBubbleIllustrationExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-next/TeachingBubble/TeachingBubble.Illustration.Example.tsx') as string;
const TeachingBubbleWideIllustrationExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-next/TeachingBubble/TeachingBubble.WideIllustration.Example.tsx') as string;
const TeachingBubbleSmallHeadlineExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-next/TeachingBubble/TeachingBubble.SmallHeadline.Example.tsx') as string;
const TeachingBubbleMultiStepExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-next/TeachingBubble/TeachingBubble.MultiStep.Example.tsx') as string;

export const TeachingBubblePageProps: IDocPageProps = {
  title: 'TeachingBubble',
  componentName: 'TeachingBubble',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/7.0/packages/@fluentui/react-next/src/components/TeachingBubble',
  examples: [
    {
      title: 'TeachingBubble Basic',
      code: TeachingBubbleBasicExampleCode,
      view: <TeachingBubbleBasicExample />,
    },
    {
      title: 'TeachingBubble Wide',
      code: TeachingBubbleWideExampleCode,
      view: <TeachingBubbleWideExample />,
    },
    {
      title: 'TeachingBubble Condensed',
      code: TeachingBubbleCondensedExampleCode,
      view: <TeachingBubbleCondensedExample />,
    },
    {
      title: 'TeachingBubble with Illustration',
      code: TeachingBubbleIllustrationExampleCode,
      view: <TeachingBubbleIllustrationExample />,
    },
    {
      title: 'TeachingBubble Wide with Illustration',
      code: TeachingBubbleWideIllustrationExampleCode,
      view: <TeachingBubbleWideIllustrationExample />,
    },
    {
      title: 'TeachingBubble with small headline',
      code: TeachingBubbleSmallHeadlineExampleCode,
      view: <TeachingBubbleSmallHeadlineExample />,
    },
    {
      title: 'TeachingBubble with multi-steps',
      code: TeachingBubbleMultiStepExampleCode,
      view: <TeachingBubbleMultiStepExample />,
    },
  ],
  overview: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/react-next/TeachingBubble/docs/TeachingBubbleOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/react-next/TeachingBubble/docs/TeachingBubbleBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
