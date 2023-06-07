import type { IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles, IStyleFunctionOrObject } from '@fluentui/react';

const getChoiceGroupOptionColor = (props: IChoiceGroupOptionStyleProps) => {
  const { theme, checked, disabled } = props;

  if (disabled) {
    return theme.semanticColors.disabledText;
  } else if (checked) {
    return theme.semanticColors.inputBackgroundChecked;
  } else {
    return theme.semanticColors.inputPlaceholderText;
  }
};

const getChoiceGroupTextColor = (props: IChoiceGroupOptionStyleProps) => {
  const { theme, checked, disabled } = props;

  if (disabled) {
    return theme.semanticColors.disabledText;
  } else if (checked) {
    return theme.semanticColors.inputIconHovered;
  } else {
    return theme.semanticColors.inputPlaceholderText;
  }
};

const getHoveredChoiceGroupOptionColor = (props: IChoiceGroupOptionStyleProps) => {
  const { theme, disabled } = props;

  if (disabled) {
    return theme.semanticColors.disabledText;
  } else {
    return theme.semanticColors.inputIconHovered;
  }
};

const getInnerCircleColor = (props: IChoiceGroupOptionStyleProps, isHover: boolean) => {
  const { theme, checked, disabled } = props;

  if (disabled && checked) {
    return theme.semanticColors.disabledText;
  } else if (checked) {
    if (isHover) {
      return theme.semanticColors.inputBackgroundCheckedHovered;
    }

    return theme.semanticColors.inputBackgroundChecked;
  } else {
    return 'transparent';
  }
};

const getOuterCircleColor = (props: IChoiceGroupOptionStyleProps, isHover: boolean) => {
  const { theme, checked, disabled } = props;

  if (disabled) {
    return theme.semanticColors.disabledText;
  } else if (checked) {
    if (isHover) {
      return theme.semanticColors.inputBackgroundCheckedHovered;
    }

    return theme.semanticColors.inputBackgroundChecked;
  } else {
    return theme.semanticColors.inputIconHovered;
  }
};

const getTextHoverColor = (props: IChoiceGroupOptionStyleProps) => {
  const { theme, checked, disabled } = props;

  if (disabled) {
    return theme.semanticColors.disabledText;
  } else if (checked) {
    return getChoiceGroupTextColor(props);
  } else {
    return theme.semanticColors.inputIconHovered;
  }
};

export const getDefaultChoiceGroupOptionStyles = (
  props: IChoiceGroupOptionStyleProps,
): Partial<IChoiceGroupOptionStyles> => {
  return {
    field: {
      color: getChoiceGroupTextColor(props),
      '.ms-ChoiceFieldLabel': {
        color: getChoiceGroupTextColor(props),
      },
      '&:hover .ms-ChoiceFieldLabel': {
        color: getTextHoverColor(props),
      },
      selectors: {
        // The circle
        '::before': {
          borderColor: getChoiceGroupOptionColor(props),
          width: '17px',
          height: '17px',
          margin: '2px',
        },
        // the inner dot
        '::after': {
          width: '11px',
          height: '11px',
          background: getInnerCircleColor(props, false),
          borderColor: getInnerCircleColor(props, false),
        },
        ':hover': {
          color: getHoveredChoiceGroupOptionColor(props),
        },
        ':hover::before': {
          borderColor: getOuterCircleColor(props, true),
        },
        ':hover::after': {
          background: getInnerCircleColor(props, true),
          borderColor: getInnerCircleColor(props, true),
        },
      },
    },
  };
};

export function getChoiceGroupOptionStyles(
  props: IChoiceGroupOptionStyleProps,
): IStyleFunctionOrObject<IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles> {
  return getDefaultChoiceGroupOptionStyles(props);
}
