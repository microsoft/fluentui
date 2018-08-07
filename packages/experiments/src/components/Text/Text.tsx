import * as React from 'react';
import { createComponent } from '../../Foundation';
import { ITextProps, ITextStyles } from './Text.types';
import { TextView as view } from './Text.view';
import { TextStyles as styles } from './Text.styles';

export const Text: React.StatelessComponent<ITextProps> = createComponent<ITextProps, ITextStyles>({
  displayName: 'Text',
  styles,
  view
});

export default Text;
