import * as React from 'react';
import { createStatelessComponent } from '../../Foundation';
import { ITextProps, ITextStyles } from './Text.types';
import { TextView as view } from './Text.view';
import { TextStyles as styles } from './Text.styles';

export const Text: React.StatelessComponent<ITextProps> = createStatelessComponent<ITextProps, ITextStyles>({
  displayName: 'Text',
  styles,
  view
});

export default Text;
