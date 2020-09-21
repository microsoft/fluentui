import * as React from 'react';
import { TeachingBubbleBasicExample } from './examples/TeachingBubble.Basic.Example';
import { TeachingBubbleWideExample } from './examples/TeachingBubble.Wide.Example';
import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';
import { TeachingBubbleCondensedExample } from './examples/TeachingBubble.Condensed.Example';
import { TeachingBubbleIllustrationExample } from './examples/TeachingBubble.Illustration.Example';
import { TeachingBubbleWideIllustrationExample } from './examples/TeachingBubble.WideIllustration.Example';
import { TeachingBubbleSmallHeadlineExample } from './examples/TeachingBubble.SmallHeadline.Example';
import { TeachingBubbleMultiStepExample } from './examples/TeachingBubble.MultiStep.Example';

const TeachingBubbleBasicExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/TeachingBubble/examples/TeachingBubble.Basic.Example.tsx') as string;
const TeachingBubbleWideExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/TeachingBubble/examples/TeachingBubble.Wide.Example.tsx') as string;
const TeachingBubbleCondensedExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/TeachingBubble/examples/TeachingBubble.Condensed.Example.tsx') as string;
const TeachingBubbleIllustrationExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/TeachingBubble/examples/TeachingBubble.Illustration.Example.tsx') as string;
const TeachingBubbleWideIllustrationExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/TeachingBubble/examples/TeachingBubble.WideIllustration.Example.tsx') as string;
const TeachingBubbleSmallHeadlineExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/TeachingBubble/examples/TeachingBubble.SmallHeadline.Example.tsx') as string;
const TeachingBubbleMultiStepExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/TeachingBubble/examples/TeachingBubble.MultiStep.Example.tsx') as string;

export const TeachingBubblePageProps: IDocPageProps = {
  title: 'TeachingBubble',
  componentName: 'TeachingBubble',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react-next/src/components/TeachingBubble',
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
  >('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/TeachingBubble/docs/TeachingBubbleOverview.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
