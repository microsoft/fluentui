import * as React from 'react';
import { createComponent } from '../../Foundation';
import { ITextProps } from './Text.types';
import { TextView } from './Text.view';
import { TextStyles as styles, TextTokens as tokens } from './Text.styles';

export const Text: React.StatelessComponent<ITextProps> = createComponent(TextView, {
  displayName: 'Text',
  styles,
  tokens
});

export default Text;
