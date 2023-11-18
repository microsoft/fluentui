import * as React from 'react';
import { TextRampExample } from './Text.Ramp.Example';
import { TextWrapExample } from './Text.Wrap.Example';
import { TextBlockExample } from './Text.Block.Example';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

const TextRampExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Text/Text.Ramp.Example.tsx') as string;

const TextWrapExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Text/Text.Wrap.Example.tsx') as string;

const TextBlockExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Text/Text.Block.Example.tsx') as string;

export const TextPageProps: IDocPageProps = {
  title: 'Text',
  componentName: 'Text',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/Text',
  examples: [
    {
      title: 'Text Ramp Example',
      code: TextRampExampleCode,
      view: <TextRampExample />,
    },
    {
      title: 'Text Wrap Example',
      code: TextWrapExampleCode,
      view: <TextWrapExample />,
    },
    {
      title: 'Text Block Example',
      code: TextBlockExampleCode,
      view: <TextBlockExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Text/docs/TextOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Text/docs/TextBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Text/docs/TextDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Text/docs/TextDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
