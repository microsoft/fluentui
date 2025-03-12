/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-compiler/react-compiler */
import { makeStyles, mergeClasses } from '@fluentui/react-components';
import { type CardPreviewState } from '@fluentui/react-components';

const cardPreviewClassNames = {
  logo: 'fui-CardPreview__logo',
};

const useCardPreviewStyle = makeStyles({
  root: {
    [`> :not(.${cardPreviewClassNames.logo})`]: {
      borderRadius: '12px',
    },
  },
});

export const useCardPreviewStyles = (state: unknown) => {
  'use no memo';

  const cardPreviewStyles = useCardPreviewStyle();
  const componentState = state as CardPreviewState;

  componentState.root.className = mergeClasses(componentState.root.className, cardPreviewStyles.root);
};
