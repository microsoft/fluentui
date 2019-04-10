import * as React from 'react';
import { Button } from './Button';
import { IButtonComponent, IButtonStylesReturnType, IButtonTokenReturnType } from './Button.types';
import { IButtonVariantProps } from './ButtonVariants.types';
import { Text } from 'office-ui-fabric-react';

export interface ICompoundButtonProps extends IButtonVariantProps {
  secondaryText?: string;
}

export type CompoundButtonType = (props: ICompoundButtonProps) => JSX.Element;

const baseTokens: IButtonComponent['tokens'] = (props, theme) => {
  const { palette } = theme;

  return {
    color: palette.neutralSecondary,
    colorHovered: palette.neutralDark,
    contentPadding: 20,
    minHeight: 72
  };
};

const primaryTokens: IButtonComponent['tokens'] = (props, theme) => {
  const { semanticColors } = theme;

  return {
    color: semanticColors.primaryButtonText,
    colorHovered: semanticColors.primaryButtonTextHovered,
    colorPressed: semanticColors.primaryButtonTextPressed
  };
};

const disabledTokens: IButtonComponent['tokens'] = (props, theme) => {
  const { semanticColors } = theme;

  return {
    color: semanticColors.buttonTextDisabled,
    colorHovered: semanticColors.buttonTextDisabled
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

  return {
    root: {
      lineHeight: '100%'
    },
    content: {
      color: disabled ? semanticColors.buttonTextDisabled : primary ? semanticColors.primaryButtonText : semanticColors.buttonText,
      selectors: {
        ':hover': {
          color: disabled
            ? semanticColors.buttonTextDisabled
            : primary
            ? semanticColors.primaryButtonTextHovered
            : semanticColors.buttonTextHovered
        }
      }
    }
  };
};

export const CompoundButton: CompoundButtonType = props => {
  const { text, iconProps, secondaryText, ...rest } = props;

  const stackTokens = { childrenGap: 5 };
  const secondaryTextStyles = {
    root: {
      height: 12
    }
  };

  return (
    <Button
      stack={{ as: 'span', horizontal: false, horizontalAlign: 'start', tokens: stackTokens }}
      content={text}
      icon={iconProps}
      styles={CompoundButtonStyles}
      tokens={CompoundButtonTokens}
      {...rest}
    >
      <Text variant="small" styles={secondaryTextStyles}>
        {secondaryText}
      </Text>
    </Button>
  );
};
