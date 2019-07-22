import * as React from 'react';
import { Button } from './Button';
import { IButtonComponent, IButtonStylesReturnType, IButtonTokenReturnType } from './Button.types';
import { IButtonVariantProps } from './ButtonVariants.types';
import { HighContrastSelector } from '../../Styling';
import { Text } from 'office-ui-fabric-react';
import { parseGap } from 'office-ui-fabric-react/lib/components/Stack/StackUtils';

export interface ICompoundButtonProps extends IButtonVariantProps {
  secondaryText?: string;
}

export type CompoundButtonType = (props: ICompoundButtonProps) => JSX.Element;

const baseTokens: IButtonComponent['tokens'] = (props, theme) => {
  const { palette } = theme;

  return {
    color: palette.neutralSecondary,
    colorHovered: palette.neutralDark,
    colorPressed: 'inherit',
    contentPadding: '16px 12px',
    iconColor: palette.neutralSecondary,
    iconColorHovered: palette.neutralDark,
    iconColorPressed: 'inherit',
    minHeight: 72
  };
};

const primaryTokens: IButtonComponent['tokens'] = (props, theme) => {
  const { semanticColors } = theme;

  return {
    color: semanticColors.primaryButtonText,
    colorHovered: semanticColors.primaryButtonTextHovered,
    colorPressed: semanticColors.primaryButtonTextPressed,
    iconColor: semanticColors.primaryButtonText,
    iconColorHovered: semanticColors.primaryButtonTextHovered,
    iconColorPressed: semanticColors.primaryButtonTextPressed
  };
};

const disabledTokens: IButtonComponent['tokens'] = (props, theme) => {
  const { semanticColors } = theme;

  return {
    color: semanticColors.buttonTextDisabled,
    colorHovered: semanticColors.buttonTextDisabled,
    colorPressed: semanticColors.buttonTextDisabled,
    iconColor: semanticColors.buttonTextDisabled,
    iconColorHovered: semanticColors.buttonTextDisabled,
    iconColorPressed: semanticColors.buttonTextDisabled
  };
};

const CompoundButtonTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => [
  baseTokens,
  props.primary && primaryTokens,
  props.disabled && disabledTokens
];

const CompoundButtonStyles: IButtonComponent['styles'] = (props, theme, tokens): IButtonStylesReturnType => {
  const { disabled, primary } = props;
  const { semanticColors } = theme;

  const { rowGap, columnGap } = parseGap(tokens.childrenGap, theme);

  return {
    root: {
      alignItems: 'flex-start',
      flexDirection: 'column',
      lineHeight: '100%',

      selectors: {
        '> *': {
          marginLeft: 0,
          marginTop: `${0.5 * rowGap.value}${rowGap.unit} ${0.5 * columnGap.value}${columnGap.unit}`
        },
        '> *:not(:first-child)': {
          marginLeft: 0,
          marginTop: `${rowGap.value}${rowGap.unit}`
        }
      }
    },
    content: {
      color: disabled ? semanticColors.buttonTextDisabled : primary ? semanticColors.primaryButtonText : semanticColors.buttonText,
      selectors: {
        ':hover': {
          selectors: {
            [HighContrastSelector]: {
              color: tokens.highContrastColorHovered
            }
          }
        },
        ':active': {
          selectors: {
            [HighContrastSelector]: {
              color: tokens.highContrastColorPressed
            }
          }
        },
        [HighContrastSelector]: {
          color: tokens.highContrastColor
        }
      }
    }
  };
};

export const CompoundButton: CompoundButtonType = props => {
  const { text, iconProps, secondaryText, ...rest } = props;

  const secondaryTextStyles = {
    root: {
      height: 12
    }
  };

  return (
    <Button content={text} icon={iconProps} styles={CompoundButtonStyles} tokens={CompoundButtonTokens} {...rest}>
      <Text variant="small" styles={secondaryTextStyles}>
        {secondaryText}
      </Text>
    </Button>
  );
};
