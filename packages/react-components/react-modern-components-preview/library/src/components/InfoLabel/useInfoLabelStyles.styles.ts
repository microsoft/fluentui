import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { InfoLabelSlots, InfoLabelState } from './InfoLabel.types';
import styles from './InfoLabel.module.css';

export const infoLabelClassNames: SlotClassNames<InfoLabelSlots> = {
  root: 'fui-InfoLabel',
  label: 'fui-InfoLabel__label',
  infoButton: 'fui-InfoLabel__infoButton',
};

export const useInfoLabelStyles = (state: InfoLabelState): InfoLabelState => {
  state.root.className = clsx(infoLabelClassNames.root, styles.root, state.root.className);
  state.label.className = clsx(infoLabelClassNames.label, styles.label, state.label.className);

  if (state.infoButton) {
    state.infoButton.className = clsx(infoLabelClassNames.infoButton, styles.infoButton, state.infoButton.className);
  }

  return state;
};
