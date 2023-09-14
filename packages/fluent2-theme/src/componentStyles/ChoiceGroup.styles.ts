import type { IChoiceGroupStyleProps, IChoiceGroupStyles, IStyleFunctionOrObject } from '@fluentui/react';

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
