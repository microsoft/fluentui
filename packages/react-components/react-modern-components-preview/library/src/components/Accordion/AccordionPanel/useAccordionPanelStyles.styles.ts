import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { AccordionPanelSlots, AccordionPanelState } from './AccordionPanel.types';
import styles from './AccordionPanel.module.css';

export const accordionPanelClassNames: SlotClassNames<Omit<AccordionPanelSlots, 'collapseMotion'>> = {
  root: 'fui-AccordionPanel',
};

export const useAccordionPanelStyles = (state: AccordionPanelState): AccordionPanelState => {
  state.root.className = clsx(accordionPanelClassNames.root, styles.root, state.root.className);

  return state;
};
