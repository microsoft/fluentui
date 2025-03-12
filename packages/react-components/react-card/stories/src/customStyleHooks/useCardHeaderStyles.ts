/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-compiler/react-compiler */
import { makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import { type CardHeaderState } from '@fluentui/react-components';

const useCardHeaderStyle = makeStyles({
  image: {
    width: '36px',
    height: '36px',
    marginRight: tokens.spacingHorizontalM,
  },
});

export const useCardHeaderStyles = (state: unknown) => {
  'use no memo';

  const cardHeaderStyles = useCardHeaderStyle();
  const componentState = state as CardHeaderState;

  if (componentState.image) {
    componentState.image.className = mergeClasses(componentState.image.className, cardHeaderStyles.image);
  }
};
