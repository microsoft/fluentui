import * as React from 'react';

import { IDocPageProps } from '../../common/DocPage.types';
import { TextFieldBasicExample } from './examples/TextField.Basic.Example';
import { TextFieldBorderlessExample } from './examples/TextField.Borderless.Example';
import { TextFieldCustomRenderExample } from './examples/TextField.CustomRender.Example';
import { TextFieldErrorMessageExample } from './examples/TextField.ErrorMessage.Example';
import { TextFieldIconExample } from './examples/TextField.Icon.Example';
import { TextFieldMultilineExample } from './examples/TextField.Multiline.Example';
import { TextFieldPlaceholderExample } from './examples/TextField.Placeholder.Example';
import { TextFieldPrefixExample } from './examples/TextField.Prefix.Example';
import { TextFieldPrefixAndSuffixExample } from './examples/TextField.PrefixAndSuffix.Example';
import { TextFieldStatus } from './TextField.checklist';
import { TextFieldStyledExample } from './examples/TextField.Styled.Example';
import { TextFieldSuffixExample } from './examples/TextField.Suffix.Example';
import { TextFieldUnderlinedExample } from './examples/TextField.Underlined.Example';
import { TextFieldAutoCompleteExample } from './examples/TextField.AutoComplete.Example';
import { TextFieldOnRenderDescriptionExample } from './examples/TextField.OnRenderDescription.Example';

const TextFieldBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Basic.Example.tsx') as string;
const TextFieldBasicExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/TextField/TextField.Basic.Example.Codepen.txt') as string;
const TextFieldBorderlessExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Borderless.Example.tsx') as string;
const TextFieldBorderlessExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/TextField/TextField.Borderless.Example.Codepen.txt') as string;
const TextFieldCustomRenderExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.CustomRender.Example.tsx') as string;
const TextFieldErrorMessageExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.ErrorMessage.Example.tsx') as string;
const TextFieldIconExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Icon.Example.tsx') as string;
const TextFieldMultilineExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Multiline.Example.tsx') as string;
const TextFieldPlaceholderExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Placeholder.Example.tsx') as string;
const TextFieldPlaceholderExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/TextField/TextField.Placeholder.Example.Codepen.txt') as string;
const TextFieldPrefixExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Prefix.Example.tsx') as string;
const TextFieldPrefixAndSuffixExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.PrefixAndSuffix.Example.tsx') as string;
const TextFieldStyledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Styled.Example.tsx') as string;
const TextFieldSuffixExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Suffix.Example.tsx') as string;
const TextFieldUnderlinedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Underlined.Example.tsx') as string;
const TextFieldUnderlinedExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/TextField/TextField.Underlined.Example.Codepen.txt') as string;
const TextFieldAutoCompleteExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.AutoComplete.Example.tsx') as string;
const TextFieldOnRenderDescriptionExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.OnRenderDescription.Example.tsx') as string;

export const TextFieldPageProps: IDocPageProps = {
  title: 'TextField',
  componentName: 'TextField',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/TextField',
  componentStatus: TextFieldStatus,
  examples: [
    {
      title: 'Default TextField with Label',
      code: TextFieldBasicExampleCode,
      view: <TextFieldBasicExample />,
      codepenJS: TextFieldBasicExampleCodepen
    },
    {
      title: 'TextField with Placeholder',
      code: TextFieldPlaceholderExampleCode,
      view: <TextFieldPlaceholderExample />,
      codepenJS: TextFieldPlaceholderExampleCodepen
    },
    {
      title: 'Multiline TextField',
      code: TextFieldMultilineExampleCode,
      view: <TextFieldMultilineExample />
    },
    {
      title: 'Underlined TextField',
      code: TextFieldUnderlinedExampleCode,
      view: <TextFieldUnderlinedExample />,
      codepenJS: TextFieldUnderlinedExampleCodepen
    },
    {
      title: 'Borderless TextField',
      code: TextFieldBorderlessExampleCode,
      view: <TextFieldBorderlessExample />,
      codepenJS: TextFieldBorderlessExampleCodepen
    },
    {
      title: 'TextField with browser AutoComplete',
      code: TextFieldAutoCompleteExampleCode,
      view: <TextFieldAutoCompleteExample />
    }
  ],
  implementationExamples: [
    {
      title: 'Textfield with a prefix',
      code: TextFieldPrefixExampleCode,
      view: <TextFieldPrefixExample />
    },
    {
      title: 'Textfield with a suffix',
      code: TextFieldSuffixExampleCode,
      view: <TextFieldSuffixExample />
    },
    {
      title: 'Textfield with a prefix and a suffix',
      code: TextFieldPrefixAndSuffixExampleCode,
      view: <TextFieldPrefixAndSuffixExample />
    },
    {
      title: 'TextField with an icon',
      code: TextFieldIconExampleCode,
      view: <TextFieldIconExample />
    },
    {
      title: 'TextField with custom Label',
      code: TextFieldCustomRenderExampleCode,
      view: <TextFieldCustomRenderExample />
    },
    {
      title: 'TextField with custom description',
      code: TextFieldOnRenderDescriptionExampleCode,
      view: <TextFieldOnRenderDescriptionExample />
    },
    {
      title: 'TextField error message variations',
      code: TextFieldErrorMessageExampleCode,
      view: <TextFieldErrorMessageExample />
    },
    {
      title: 'TextField Subcomponent Styling',
      code: TextFieldStyledExampleCode,
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
