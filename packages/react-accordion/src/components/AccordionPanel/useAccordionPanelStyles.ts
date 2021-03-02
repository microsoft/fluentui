import { makeStyles, ax } from '@fluentui/react-make-styles';
import { AccordionPanelState } from './AccordionPanel.types';

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles<AccordionPanelState>([
  [
    null,
    (theme) => ({
      color: theme.alias.color.neutral.neutralForeground2,
      backgroundColor: theme.alias.color.neutral.neutralBackground2,
      fontSize: theme.global.type.fontSizes.base[300],
      fontFamily: theme.global.type.fontFamilies.base,
      marginInline: '12px',
      borderRadius: '4px',
    }),
  ],
]);

/** Applies style classnames to slots */
export const useAccordionPanelStyles = (state: AccordionPanelState) => {
  const rootClassName = useRootStyles(state);

  state.className = ax(rootClassName, state.className);

  return state;
};
