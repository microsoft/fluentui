import * as React from 'react';

import { IDocPageProps } from '../../common/DocPage.types';
import { TextFieldBasicExample } from './examples/TextField.Basic.Example';
import { TextFieldBorderlessExample } from './examples/TextField.Borderless.Example';
import { TextFieldCustomRenderExample } from './examples/TextField.CustomRender.Example';
import { TextFieldErrorMessageExample } from './examples/TextField.ErrorMessage.Example';
import { TextFieldMultilineExample } from './examples/TextField.Multiline.Example';
import { TextFieldControlledExample } from './examples/TextField.Controlled.Example';
import { TextFieldPrefixAndSuffixExample } from './examples/TextField.PrefixAndSuffix.Example';
import { TextFieldStyledExample } from './examples/TextField.Styled.Example';
import { TextFieldMaskedExample } from './examples/TextField.Masked.Example';

const TextFieldBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Basic.Example.tsx') as string;
const TextFieldBorderlessExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Borderless.Example.tsx') as string;
const TextFieldCustomRenderExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.CustomRender.Example.tsx') as string;
const TextFieldErrorMessageExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.ErrorMessage.Example.tsx') as string;
const TextFieldMultilineExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Multiline.Example.tsx') as string;
const TextFieldControlledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Controlled.Example.tsx') as string;
const TextFieldPrefixAndSuffixExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.PrefixAndSuffix.Example.tsx') as string;
const TextFieldStyledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Styled.Example.tsx') as string;
const TextFieldMaskedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Masked.Example.tsx') as string;

export const TextFieldPageProps: IDocPageProps = {
  title: 'TextField',
  componentName: 'TextField',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/TextField',
  examples: [
    {
      title: 'Basic TextFields',
      code: TextFieldBasicExampleCode,
      view: <TextFieldBasicExample />
    },
    {
      title: 'Controlled TextFields',
      code: TextFieldControlledExampleCode,
      view: <TextFieldControlledExample />
    },
    {
      title: 'Multiline TextField',
      code: TextFieldMultilineExampleCode,
      view: <TextFieldMultilineExample />
    },
    {
      title: 'Underlined and borderless TextFields',
      code: TextFieldBorderlessExampleCode,
      view: <TextFieldBorderlessExample />
    },
    {
      title: 'Customizable Masked TextField',
      code: TextFieldMaskedExampleCode,
      view: <TextFieldMaskedExample />
    },
    {
      title: 'TextField with prefix and/or suffix',
      code: TextFieldPrefixAndSuffixExampleCode,
      view: <TextFieldPrefixAndSuffixExample />
    },
    {
      title: 'TextFields with custom rendering',
      code: TextFieldCustomRenderExampleCode,
      view: <TextFieldCustomRenderExample />
    },
    {
      title: 'TextField error message variations',
      code: TextFieldErrorMessageExampleCode,
      view: <TextFieldErrorMessageExample />
    },
    {
      title: 'TextField subcomponent styling',
      code: TextFieldStyledExampleCode,
      view: <TextFieldStyledExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/TextField/docs/TextFieldOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/TextField/docs/TextFieldDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/TextField/docs/TextFieldDonts.md'),
  isHeaderVisible: false,
  isFeedbackVisible: true,
  allowNativeProps: true,
  nativePropsElement: ['input', 'textarea']
};
