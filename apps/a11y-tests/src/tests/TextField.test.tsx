import * as React from 'react';
import { testComponent } from './testComponent';

import { TextFieldBasicExample } from 'office-ui-fabric-react/lib/components/TextField/examples/TextField.Basic.Example';
import { TextFieldBorderlessExample } from 'office-ui-fabric-react/lib/components/TextField/examples/TextField.Borderless.Example';
import { TextFieldControlledExample } from 'office-ui-fabric-react/lib/components/TextField/examples/TextField.Controlled.Example';
import { TextFieldCustomRenderExample } from 'office-ui-fabric-react/lib/components/TextField/examples/TextField.CustomRender.Example';
import { TextFieldErrorMessageExample } from 'office-ui-fabric-react/lib/components/TextField/examples/TextField.ErrorMessage.Example';
import { TextFieldMultilineExample } from 'office-ui-fabric-react/lib/components/TextField/examples/TextField.Multiline.Example';
// prettier-ignore
import { TextFieldPrefixAndSuffixExample }
  from 'office-ui-fabric-react/lib/components/TextField/examples/TextField.PrefixAndSuffix.Example';
import { TextFieldStyledExample } from 'office-ui-fabric-react/lib/components/TextField/examples/TextField.Styled.Example';

export const textFieldTestComponents = [
  { name: 'TextField', pageName: 'TextFieldBasicExample', elem: <TextFieldBasicExample /> },
  { name: 'TextField', pageName: 'TextFieldBorderlessExample', elem: <TextFieldBorderlessExample /> },
  { name: 'TextField', pageName: 'TextFieldControlledExample', elem: <TextFieldControlledExample /> },
  { name: 'TextField', pageName: 'TextFieldCustomRenderExample', elem: <TextFieldCustomRenderExample /> },
  { name: 'TextField', pageName: 'TextFieldErrorMessageExample', elem: <TextFieldErrorMessageExample /> },
  { name: 'TextField', pageName: 'TextFieldMultilineExample', elem: <TextFieldMultilineExample /> },
  { name: 'TextField', pageName: 'TextFieldPrefixAndSuffixExample', elem: <TextFieldPrefixAndSuffixExample /> },
  { name: 'TextField', pageName: 'TextFieldStyledExample', elem: <TextFieldStyledExample /> }
];

textFieldTestComponents.forEach(component => testComponent(component));
