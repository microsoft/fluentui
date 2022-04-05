import * as React from 'react';
import { createComponent } from '@fluentui/foundation-legacy';
import { TextView } from './Text.view';
import { TextStyles as styles } from './Text.styles';
import type { ITextProps } from './Text.types';

export const Text: React.FunctionComponent<ITextProps> = createComponent(TextView, {
  displayName: 'Text',
  styles,
});

export default Text;
