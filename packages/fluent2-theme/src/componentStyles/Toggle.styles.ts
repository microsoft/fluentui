import type { IToggleStyleProps, IToggleStyles } from '@fluentui/react';

const getPillBackgroundColor = (props: IToggleStyleProps) => {
  const { theme, checked, disabled } = props;
  const { semanticColors } = theme;

  if (checked) {
    return disabled ? semanticColors.buttonBackgroundDisabled : semanticColors.inputBackgroundChecked;
  } else if (!checked) {
    return semanticColors.primaryButtonBorder;
  }

  return undefined;
};

const getHoveredPillBackgroundColor = (props: IToggleStyleProps) => {
  const { theme, checked, disabled } = props;
  const { semanticColors } = theme;

  if (checked) {
    return disabled ? semanticColors.buttonBackgroundDisabled : semanticColors.inputBackgroundCheckedHovered;
  } else if (!checked) {
    return semanticColors.primaryButtonBorder;
  }

  return undefined;
};

const getPressedPillBackgroundColor = (props: IToggleStyleProps) => {
  const { theme, checked, disabled } = props;
  const { semanticColors } = theme;

  if (checked) {
    return disabled ? semanticColors.disabledBackground : semanticColors.primaryButtonBackgroundPressed;
  } else if (!checked) {
    return semanticColors.primaryButtonBorder;
  }

  return undefined;
};

const getLabelColor = (props: IToggleStyleProps) => {
  const { theme, disabled } = props;
  const { semanticColors } = theme;

  return disabled ? semanticColors.disabledBodySubtext : semanticColors.inputText;
};

export const getToggleStyles = (props: IToggleStyleProps): Partial<IToggleStyles> => {
  const { theme, disabled } = props;
  const { semanticColors, effects } = theme;

  return {
    root: {},
    label: {
      color: getLabelColor(props),
    },
    thumb: {
      width: '14px',
      height: '14px',
      backgroundColor: disabled ? semanticColors.inputIconDisabled : undefined,
    },
    container: {},
    pill: {
      backgroundColor: getPillBackgroundColor(props),
      '&:hover': {
        backgroundColor: getHoveredPillBackgroundColor(props),
      },
      '&:active': {
        backgroundColor: getPressedPillBackgroundColor(props),
      },
      '&:focus&:after': {
        borderRadius: effects.roundedCorner4,
        outlineWidth: '2px',
      },
    },
    text: {},
  };
};
