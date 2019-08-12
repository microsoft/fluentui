import * as React from 'react';
import { createComponent } from '../../Foundation';
import { ITextProps } from './Text.types';
import { TextView } from './Text.view';
import { TextClassNames, TextStyles as styles } from './Text.styles';

const classNames = Object.values(TextClassNames);

export const Text: React.StatelessComponent<ITextProps> = createComponent(TextView, {
  classNames,
  displayName: 'Text',
  precedenceList: [],
  styles
});

export default Text;
