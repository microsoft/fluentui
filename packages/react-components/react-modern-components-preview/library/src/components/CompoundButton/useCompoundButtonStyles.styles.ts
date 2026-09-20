import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CompoundButtonSlots, CompoundButtonState } from './CompoundButton.types';
import buttonStyles from '../Button/Button.module.css';
import styles from './CompoundButton.module.css';

export const compoundButtonClassNames: SlotClassNames<CompoundButtonSlots> = {
  root: 'fui-CompoundButton',
  icon: 'fui-CompoundButton__icon',
  contentContainer: 'fui-CompoundButton__contentContainer',
  secondaryContent: 'fui-CompoundButton__secondaryContent',
};

export const useCompoundButtonStyles = (state: CompoundButtonState): CompoundButtonState => {
  state.root.className = clsx(compoundButtonClassNames.root, buttonStyles.root, styles.root, state.root.className);
  state.contentContainer.className = clsx(
    compoundButtonClassNames.contentContainer,
    styles.contentContainer,
    state.contentContainer.className,
  );

  if (state.icon) {
    state.icon.className = clsx(compoundButtonClassNames.icon, buttonStyles.icon, styles.icon, state.icon.className);
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = clsx(
      compoundButtonClassNames.secondaryContent,
      styles.secondaryContent,
      state.secondaryContent.className,
    );
  }

  return state;
};
