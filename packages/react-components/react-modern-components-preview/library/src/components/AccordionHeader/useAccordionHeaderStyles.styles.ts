import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { AccordionHeaderSlots, AccordionHeaderState } from './AccordionHeader.types';
import styles from './AccordionHeader.module.css';

export const accordionHeaderClassNames: SlotClassNames<AccordionHeaderSlots> = {
  root: 'fui-AccordionHeader',
  button: 'fui-AccordionHeader__button',
  expandIcon: 'fui-AccordionHeader__expandIcon',
  icon: 'fui-AccordionHeader__icon',
};

export const useAccordionHeaderStyles = (state: AccordionHeaderState): AccordionHeaderState => {
  state.root.className = clsx(accordionHeaderClassNames.root, styles.root, state.root.className);
  state.button.className = clsx(accordionHeaderClassNames.button, styles.button, state.button.className);

  if (state.expandIcon) {
    state.expandIcon.className = clsx(
      accordionHeaderClassNames.expandIcon,
      styles.expandIcon,
      state.expandIcon.className,
    );
  }

  if (state.icon) {
    state.icon.className = clsx(accordionHeaderClassNames.icon, styles.icon, state.icon.className);
  }

  return state;
};
