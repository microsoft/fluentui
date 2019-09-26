import * as React from 'react';
import { TextRampExample } from './examples/Text.Ramp.Example';
import { TextWrapExample } from './examples/Text.Wrap.Example';
import { TextBlockExample } from './examples/Text.Block.Example';

import { IDocPageProps } from '../../common/DocPage.types';

const TextRampExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Text/examples/Text.Ramp.Example.tsx') as string;

const TextWrapExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Text/examples/Text.Wrap.Example.tsx') as string;

const TextBlockExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Text/examples/Text.Block.Example.tsx') as string;

export const TextPageProps: IDocPageProps = {
  title: 'Text',
  componentName: 'Text',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Text',
  examples: [
    {
      title: 'Text Ramp Example',
      code: TextRampExampleCode,
      view: <TextRampExample />
    },
    {
      title: 'Text Wrap Example',
      code: TextWrapExampleCode,
      view: <TextWrapExample />
    },
    {
      title: 'Text Block Example',
      code: TextBlockExampleCode,
      view: <TextBlockExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Text/docs/TextOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Text/docs/TextDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Text/docs/TextDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
