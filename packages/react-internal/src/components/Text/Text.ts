import * as React from 'react';
import { createComponent } from '@uifabric/foundation';
import { ITextProps } from './Text.types';
import { TextView } from './Text.view';
import { TextStyles as styles } from './Text.styles';

export const Text: React.FunctionComponent<ITextProps> = createComponent(TextView, {
  displayName: 'Text',
  styles,
});

export default Text;
