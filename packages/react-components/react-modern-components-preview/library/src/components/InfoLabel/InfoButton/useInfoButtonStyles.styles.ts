import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { InfoButtonSlots, InfoButtonState } from './InfoButton.types';
import styles from './InfoButton.module.css';

export const infoButtonClassNames: SlotClassNames<InfoButtonSlots> = {
  root: 'fui-InfoButton',
  popover: 'fui-InfoButton__popover',
  info: 'fui-InfoButton__info',
};

export const useInfoButtonStyles = (state: InfoButtonState): InfoButtonState => {
  state.root.className = clsx(infoButtonClassNames.root, styles.root, state.root.className);
  state.info.className = clsx(infoButtonClassNames.info, styles.info, state.info.className);

  return state;
};
