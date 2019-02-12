import * as React from 'react';
import { createComponent } from '@uifabric/foundation';
import { ITextProps } from './Text.types';
import { TextView as view } from './Text.view';
import { TextStyles as styles } from './Text.styles';

export const Text: React.StatelessComponent<ITextProps> = createComponent({
  displayName: 'Text',
  styles,
  view
});

export default Text;
