import * as React from 'react';

import { IDocPageProps } from '../../common/DocPage.types';
import { TextFieldBasicExample } from './examples/TextField.Basic.Example';
import { TextFieldBorderlessExample } from './examples/TextField.Borderless.Example';
import { TextFieldCustomRenderExample } from './examples/TextField.CustomRender.Example';
import { TextFieldErrorMessageExample } from './examples/TextField.ErrorMessage.Example';
import { TextFieldMultilineExample } from './examples/TextField.Multiline.Example';
import { TextFieldControlledExample } from './examples/TextField.Controlled.Example';
import { TextFieldPrefixAndSuffixExample } from './examples/TextField.PrefixAndSuffix.Example';
import { TextFieldStatus } from './TextField.checklist';
import { TextFieldStyledExample } from './examples/TextField.Styled.Example';

const TextFieldBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Basic.Example.tsx') as string;
const TextFieldBasicExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Basic.Example.tsx') as string;
const TextFieldBorderlessExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Borderless.Example.tsx') as string;
const TextFieldBorderlessExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Borderless.Example.tsx') as string;
const TextFieldCustomRenderExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.CustomRender.Example.tsx') as string;
const TextFieldCustomRenderExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.CustomRender.Example.tsx') as string;
const TextFieldErrorMessageExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.ErrorMessage.Example.tsx') as string;
const TextFieldErrorMessageExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.ErrorMessage.Example.tsx') as string;
const TextFieldMultilineExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Multiline.Example.tsx') as string;
const TextFieldMultilineExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Multiline.Example.tsx') as string;
const TextFieldControlledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Controlled.Example.tsx') as string;
const TextFieldControlledExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Controlled.Example.tsx') as string;
const TextFieldPrefixAndSuffixExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.PrefixAndSuffix.Example.tsx') as string;
const TextFieldPrefixAndSuffixExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.PrefixAndSuffix.Example.tsx') as string;
const TextFieldStyledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Styled.Example.tsx') as string;
const TextFieldStyledExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Styled.Example.tsx') as string;

export const TextFieldPageProps: IDocPageProps = {
  title: 'TextField',
  componentName: 'TextField',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/TextField',
  componentStatus: TextFieldStatus,
  examples: [
    {
      title: 'Basic TextFields',
      code: TextFieldBasicExampleCode,
      view: <TextFieldBasicExample />,
      codepenJS: TextFieldBasicExampleCodepen
    },
    {
      title: 'Controlled TextFields',
      code: TextFieldControlledExampleCode,
      view: <TextFieldControlledExample />,
      codepenJS: TextFieldControlledExampleCodepen
    },
    {
      title: 'Multiline TextField',
      code: TextFieldMultilineExampleCode,
      codepenJS: TextFieldMultilineExampleCodepen,
      view: <TextFieldMultilineExample />
    },
    {
      title: 'Underlined and borderless TextFields',
      code: TextFieldBorderlessExampleCode,
      view: <TextFieldBorderlessExample />,
      codepenJS: TextFieldBorderlessExampleCodepen
    },
    {
      title: 'TextField with prefix and/or suffix',
      code: TextFieldPrefixAndSuffixExampleCode,
      codepenJS: TextFieldPrefixAndSuffixExampleCodepen,
      view: <TextFieldPrefixAndSuffixExample />
    },
    {
      title: 'TextFields with custom rendering',
      code: TextFieldCustomRenderExampleCode,
      codepenJS: TextFieldCustomRenderExampleCodepen,
      view: <TextFieldCustomRenderExample />
    },
    {
      title: 'TextField error message variations',
      code: TextFieldErrorMessageExampleCode,
      codepenJS: TextFieldErrorMessageExampleCodepen,
      view: <TextFieldErrorMessageExample />
    },
    {
      title: 'TextField subcomponent styling',
      code: TextFieldStyledExampleCode,
      codepenJS: TextFieldStyledExampleCodepen,
      view: <TextFieldStyledExample />
    }
  ],
  propertiesTablesSources: [require<string>('!raw-loader!office-ui-fabric-react/src/components/TextField/TextField.types.ts')],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/TextField/docs/TextFieldOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/TextField/docs/TextFieldDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/TextField/docs/TextFieldDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
  nativePropsElement: ['input', 'textarea']
};
