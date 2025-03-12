/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-compiler/react-compiler */
import { makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import { type CardState } from '@fluentui/react-components';

const cardPreviewClassNames = {
  root: 'fui-CardPreview',
};

const useCardStyle = makeStyles({
  root: {
    [`> .${cardPreviewClassNames.root}`]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  small: {
    borderRadius: '12px',
    borderTopColor: tokens.colorNeutralStroke2,
    borderRightColor: tokens.colorNeutralStroke2,
    borderBottomColor: tokens.colorNeutralStroke2,
    borderLeftColor: tokens.colorNeutralStroke2,
    padding: tokens.spacingVerticalL,
  },
  medium: {
    // Medium is default
    borderRadius: '24px',
    borderTopColor: tokens.colorNeutralStroke2,
    borderRightColor: tokens.colorNeutralStroke2,
    borderBottomColor: tokens.colorNeutralStroke2,
    borderLeftColor: tokens.colorNeutralStroke2,
    padding: tokens.spacingVerticalXXL,
  },
  large: {
    borderRadius: '40px',
    borderTopColor: tokens.colorNeutralStroke2,
    borderRightColor: tokens.colorNeutralStroke2,
    borderBottomColor: tokens.colorNeutralStroke2,
    borderLeftColor: tokens.colorNeutralStroke2,
    padding: tokens.spacingVerticalXXL,
  },
});

export const useCardStyles = (state: unknown) => {
  'use no memo';

  const cardStyles = useCardStyle();
  const componentState = state as CardState;
  const size = componentState.size ?? 'medium';

  componentState.root.className = mergeClasses(componentState.root.className, cardStyles.root, cardStyles[size]);
};
