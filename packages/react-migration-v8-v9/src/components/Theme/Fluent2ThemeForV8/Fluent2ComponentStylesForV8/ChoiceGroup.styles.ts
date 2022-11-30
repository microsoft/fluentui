import type { IChoiceGroupStyleProps, IChoiceGroupStyles, IStyleFunctionOrObject } from '@fluentui/react';
import type { IM365ChoiceGroupStyleProps, IM365ChoiceGroupStyles } from '@m365-admin/m365-choice-group';

const getDefaultChoiceGroupStyles = (props: IChoiceGroupStyleProps) => {
  const { theme } = props;

  return {
    root: {},
    label: {
      color: theme.semanticColors.inputPlaceholderText,
    },
    flexContainer: {},
  };
};

export function getChoiceGroupStyles(
  props: IChoiceGroupStyleProps,
): IStyleFunctionOrObject<IChoiceGroupStyleProps, IChoiceGroupStyles> {
  return getDefaultChoiceGroupStyles(props);
}

export function getM365ChoiceGroupStyles(
  props: IM365ChoiceGroupStyleProps,
): IStyleFunctionOrObject<IM365ChoiceGroupStyleProps, IM365ChoiceGroupStyles> {
  const choiceGroupStyles = getDefaultChoiceGroupStyles(props);

  return {
    ...choiceGroupStyles,
    subComponentStyles: {
      preTextIcon: {
        root: {
          left: '32px',
        },
      },
    },
  };
}
