import * as React from 'react';
import { createComponent, IComponent, IComponentStyles, IStylesFunction, ITokenFunction } from '@uifabric/foundation';
import { Text, ITextStyles } from 'office-ui-fabric-react';
import { parseGap } from 'office-ui-fabric-react/lib/components/Stack/StackUtils';
import { HighContrastSelector } from '../../../Styling';
import { useButtonState as state } from '../Button.state';
import { ButtonStyles, ButtonTokens } from '../Button.styles';
import {
  IButtonProps,
  IButtonSlots,
  IButtonStyles,
  IButtonStylesReturnType,
  IButtonTokenReturnType,
  IButtonTokens,
  IButtonViewProps
} from '../Button.types';
import { ButtonView } from '../Button.view';

export interface ICompoundButtonProps extends IButtonProps {
  secondaryText?: string;
}

export interface ICompoundButtonViewProps extends ICompoundButtonProps {}

export interface ICompountButtonTokens extends IButtonTokens {
  secondaryColor?: string;
  secondaryColorHovered?: string;
  secondaryColorPressed?: string;
}

export type ICompoundButtonComponent = IComponent<ICompoundButtonProps, ICompountButtonTokens, IButtonStyles, ICompoundButtonViewProps>;

const baseTokens: ICompoundButtonComponent['tokens'] = (props, theme) => {
  const { palette } = theme;

  return {
    childrenGap: 5,
    contentPadding: '16px 12px',
    iconColor: palette.neutralSecondary,
    iconColorHovered: palette.neutralDark,
    iconColorPressed: 'inherit',
    minHeight: 72,
    secondaryColor: palette.neutralSecondary,
    secondaryColorHovered: palette.neutralDark,
    secondaryColorPressed: 'inherit'
  };
};

const primaryTokens: ICompoundButtonComponent['tokens'] = (props, theme) => {
  const { semanticColors } = theme;

  return {
    iconColor: semanticColors.primaryButtonText,
    iconColorHovered: semanticColors.primaryButtonTextHovered,
    iconColorPressed: semanticColors.primaryButtonTextPressed,
    secondaryColor: semanticColors.primaryButtonText,
    secondaryColorHovered: semanticColors.primaryButtonTextHovered,
    secondaryColorPressed: semanticColors.primaryButtonTextPressed
  };
};

const disabledTokens: ICompoundButtonComponent['tokens'] = (props, theme) => {
  const { semanticColors } = theme;

  return {
    iconColor: semanticColors.buttonTextDisabled,
    iconColorHovered: semanticColors.buttonTextDisabled,
    iconColorPressed: semanticColors.buttonTextDisabled,
    secondaryColor: semanticColors.buttonTextDisabled,
    secondaryColorHovered: semanticColors.buttonTextDisabled,
    secondaryColorPressed: semanticColors.buttonTextDisabled
  };
};

const CompoundButtonTokens: ICompoundButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const regularTokens = (ButtonTokens as ITokenFunction<IButtonViewProps, IButtonTokens>)(props, theme);

  return [regularTokens, baseTokens, props.primary && primaryTokens, props.disabled && disabledTokens];
};

const CompoundButtonStyles: ICompoundButtonComponent['styles'] = (props, theme, tokens): IButtonStylesReturnType => {
  const { rowGap, columnGap } = parseGap(tokens.childrenGap, theme);

  const regularStyles = (ButtonStyles as IStylesFunction<IButtonViewProps, IButtonTokens, IComponentStyles<IButtonSlots>>)(
    props,
    theme,
    tokens
  );

  return {
    root: [
      regularStyles.root,
      {
        alignItems: 'flex-start',
        color: tokens.secondaryColor,
        flexDirection: 'column',
        lineHeight: '100%',

        selectors: {
          '> *': {
            marginLeft: 0,
            marginTop: `${0.5 * rowGap.value}${rowGap.unit} ${0.5 * columnGap.value}${columnGap.unit}`,
            textOverflow: 'ellipsis'
          },
          '> *:not(:first-child)': {
            marginLeft: 0,
            marginTop: `${columnGap.value}${columnGap.unit}`
          },
          ':hover': {
            color: tokens.secondaryColorHovered,

            selectors: {
              [HighContrastSelector]: {
                color: tokens.highContrastColorHovered
              }
            }
          },
          ':active': {
            color: tokens.secondaryColorPressed,

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
    ],
    content: [
      regularStyles.content,
      {
        color: tokens.color,
        selectors: {
          ':hover': {
            color: tokens.colorHovered,

            selectors: {
              [HighContrastSelector]: {
                color: tokens.highContrastColorHovered
              }
            }
          },
          ':active': {
            color: tokens.colorPressed,

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
    ],
    icon: regularStyles.icon
  };
};

const secondaryTextStyles: ITextStyles = {
  root: {
    height: 12
  }
};

const CompoundButtonView: ICompoundButtonComponent['view'] = props => {
  const { secondaryText, ...rest } = props;

  return (
    <ButtonView {...rest}>
      <Text variant="small" styles={secondaryTextStyles}>
        {secondaryText}
      </Text>
    </ButtonView>
  );
};

export const CompoundButton: React.StatelessComponent<ICompoundButtonProps> = createComponent(CompoundButtonView, {
  displayName: 'CompoundButton',
  state,
  styles: CompoundButtonStyles,
  tokens: CompoundButtonTokens
});
