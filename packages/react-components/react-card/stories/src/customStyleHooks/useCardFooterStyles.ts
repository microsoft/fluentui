/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-compiler/react-compiler */
import { makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import { type CardFooterState } from '@fluentui/react-components';

const useCardFooterStyle = makeStyles({
  root: {
    gap: tokens.spacingVerticalSNudge,
  },
});

export const useCardFooterStyles = (state: unknown) => {
  const cardFooterStyles = useCardFooterStyle();
  const componentState = state as CardFooterState;

  componentState.root.className = mergeClasses(componentState.root.className, cardFooterStyles.root);
};
