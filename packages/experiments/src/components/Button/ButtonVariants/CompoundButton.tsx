import * as React from 'react';
import { createComponent, IComponentStyles, IStylesFunction, ITokenFunction } from '@uifabric/foundation';
import { HighContrastSelector } from '../../../Styling';
import { useButtonState as state } from '../Button.state';
import { ButtonStyles, ButtonTokens } from '../Button.styles';
import {
  IButtonComponent,
  IButtonProps,
  IButtonSlots,
  IButtonStylesReturnType,
  IButtonTokenReturnType,
  IButtonTokens,
  IButtonViewProps
} from '../Button.types';
import { ButtonView } from '../Button.view';

// TODO: Missing
// export interface ICompoundButtonProps extends IButtonVariantProps {
//   secondaryText?: string;
// }

// export type CompoundButtonType = (props: ICompoundButtonProps) => JSX.Element;

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

const CompoundButtonTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const regularTokens = (ButtonTokens as ITokenFunction<IButtonViewProps, IButtonTokens>)(props, theme);

  return [regularTokens, baseTokens];
};

const CompoundButtonStyles: IButtonComponent['styles'] = (props, theme, tokens): IButtonStylesReturnType => {
  const { disabled, primary } = props;
  const { semanticColors } = theme;

  const regularStyles = (ButtonStyles as IStylesFunction<IButtonViewProps, IButtonTokens, IComponentStyles<IButtonSlots>>)(
    props,
    theme,
    tokens
  );

  return {
    root: [
      regularStyles.root,
      {
        lineHeight: '100%'
      }
    ],
    content: [
      regularStyles.content,
      {
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
    ],
    stack: regularStyles.stack,
    icon: regularStyles.icon
  };
};

export const CompoundButton: React.StatelessComponent<IButtonProps> = createComponent(ButtonView, {
  displayName: 'CompoundButton',
  state,
  styles: CompoundButtonStyles,
  tokens: CompoundButtonTokens
});

// TODO: Check how to get missing styling
// export const CompoundButton: CompoundButtonType = props => {
//   const { text, iconProps, secondaryText, ...rest } = props;

//   const stackTokens = { childrenGap: 5 };
//   const secondaryTextStyles = {
//     root: {
//       height: 12
//     }
//   };

//   return (
//     <Button
//       stack={{ as: 'span', horizontal: false, horizontalAlign: 'start', tokens: stackTokens }}
//       content={text}
//       icon={iconProps}
//       styles={CompoundButtonStyles}
//       tokens={CompoundButtonTokens}
//       {...rest}
//     >
//       <Text variant="small" styles={secondaryTextStyles}>
//         {secondaryText}
//       </Text>
//     </Button>
//   );
// };
