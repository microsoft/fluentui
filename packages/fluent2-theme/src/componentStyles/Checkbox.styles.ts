import type { ICheckboxStyleProps, ICheckboxStyles, IStyleFunctionOrObject } from '@fluentui/react';

const externalPadding = '3px';

const getTextColor = (props: ICheckboxStyleProps) => {
  const { theme, checked, disabled } = props;

  if (disabled) {
    return theme.semanticColors.disabledSubtext;
  }

  if (checked) {
    return theme.semanticColors.bodyTextChecked;
  }

  return theme.semanticColors.inputPlaceholderText;
};

const getBorderColor = (props: ICheckboxStyleProps) => {
  const { theme, checked, disabled } = props;

  if (disabled) {
    return theme.semanticColors.disabledBorder;
  }

  if (checked) {
    return theme.semanticColors.inputBackgroundChecked;
  }

  return theme.semanticColors.inputPlaceholderText;
};

const getBackgroundColor = (props: ICheckboxStyleProps) => {
  const { theme, checked, disabled } = props;

  if (disabled) {
    return checked ? theme.semanticColors.disabledBorder : theme.semanticColors.inputBackground;
  }

  if (checked) {
    return theme.semanticColors.inputBackgroundChecked;
  }

  return theme.semanticColors.inputBackground;
};

const getHoveredBorderColor = (props: ICheckboxStyleProps) => {
  const { theme, checked, disabled } = props;

  if (disabled) {
    return theme.semanticColors.disabledBorder;
  }

  if (checked) {
    return theme.semanticColors.inputBackgroundCheckedHovered;
  }

  return theme.semanticColors.inputIconHovered;
};

const getHoveredBackgroundColor = (props: ICheckboxStyleProps) => {
  const { theme, checked, disabled } = props;

  if (disabled) {
    return checked ? theme.semanticColors.disabledBorder : theme.semanticColors.inputBackground;
  }

  if (checked) {
    return theme.semanticColors.inputBackgroundCheckedHovered;
  }

  return theme.semanticColors.inputBackground;
};

const getHoveredTextColor = (props: ICheckboxStyleProps) => {
  const { theme, disabled } = props;

  if (disabled) {
    return theme.semanticColors.disabledSubtext;
  }

  return theme.semanticColors.inputIconHovered;
};

const getCheckmarkColor = (props: ICheckboxStyleProps) => {
  const { theme, disabled } = props;

  if (disabled) {
    return theme.semanticColors.buttonTextDisabled;
  }

  return undefined;
};

const getHoveredCheckmarkColor = (props: ICheckboxStyleProps) => {
  const { theme, disabled, checked } = props;

  if (disabled) {
    return theme.semanticColors.buttonTextDisabled;
  }

  if (!checked) {
    return theme.semanticColors.inputBackground;
  }

  return undefined;
};

const getDefaultCheckboxStyles = (props: ICheckboxStyleProps) => {
  return {
    root: {
      '&:hover .ms-Checkbox-checkbox': {
        borderColor: getHoveredBorderColor(props),
        background: getHoveredBackgroundColor(props),
      },
      '&:hover .ms-Checkbox-text': {
        color: getHoveredTextColor(props),
      },
      '&:hover .ms-Checkbox-checkmark': {
        color: getHoveredCheckmarkColor(props),
      },
    },
    label: {
      gap: '4px',
      padding: externalPadding,
    },
    checkbox: {
      margin: 0,
      backgroundColor: getBackgroundColor(props),
      borderColor: getBorderColor(props),
    },
    text: {
      margin: 0,
      color: getTextColor(props),
    },
    checkmark: {
      color: getCheckmarkColor(props),
    },
  };
};

export function getCheckboxStyles(
  props: ICheckboxStyleProps,
): IStyleFunctionOrObject<ICheckboxStyleProps, ICheckboxStyles> {
  return getDefaultCheckboxStyles(props);
}
