import * as React from 'react';
import { createComponent } from '../../../Foundation';
import { useSplitButtonState as state } from './SplitButton.state';
import { SplitButtonClassNames, SplitButtonStyles as styles, SplitButtonTokens as tokens } from './SplitButton.styles';
import { ISplitButtonProps } from './SplitButton.types';
import { SplitButtonView } from './SplitButton.view';

const classNames = Object.values(SplitButtonClassNames);

export const SplitButton: React.StatelessComponent<ISplitButtonProps> = createComponent(SplitButtonView, {
  classNames,
  displayName: 'SplitButton',
  precedenceList: ['checked', 'defaultExpanded', 'expanded', 'primaryActionDisabled', 'disabled'],
  state,
  styles,
  tokens
});

export default SplitButton;
