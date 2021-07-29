import { getGlobalClassNames, HighContrastSelector } from '@fluentui/react/lib/Styling';
import { ICardComponent, ICardStylesReturnType, ICardTokenReturnType } from './Card.types';

const GlobalClassNames = {
  root: 'ms-Card',
};

const baseTokens: ICardComponent['tokens'] = (props, theme) => {
  const { effects } = theme;

  return {
    boxShadow: effects.elevation4,
    childrenGap: 12,
    childrenMargin: 0,
    cursor: 'default',
    height: 'inherit',
    highContrastBoxShadow: '0 1.6px 3.6px 0 Highlight, 0 0.3px 0.9px 0 Highlight',
    minHeight: '348px',
    minWidth: '212px',
    maxWidth: '286px',
  };
};

const horizontalTokens: ICardComponent['tokens'] = {
  height: 'auto',
  minWidth: '300px',
  maxWidth: '500px',
};

const clickableTokens: ICardComponent['tokens'] = (props, theme) => {
  const { effects } = theme;

  return {
    borderFocused: '1px solid black',
    boxShadowFocused: effects.elevation8,
    boxShadowHovered: effects.elevation8,
    cursor: 'pointer',
    highContrastBoxShadowHovered: '0 3.2px 7.2px 0 Highlight, 0 0.6px 1.8px 0 Highlight',
  };
};

/** @deprecated */
export const CardTokens: ICardComponent['tokens'] = (props, theme): ICardTokenReturnType => [
  baseTokens,
  props.horizontal && horizontalTokens,
  props.onClick && clickableTokens,
];

/** @deprecated */
export const CardStyles: ICardComponent['styles'] = (props, theme, tokens): ICardStylesReturnType => {
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      {
        borderRadius: '2px',
        boxShadow: tokens.boxShadow,
        cursor: tokens.cursor,
        height: tokens.height,
        maxWidth: tokens.maxWidth,
        minWidth: tokens.minWidth,
        outline: 'none',
        transition: 'box-shadow 0.5s ease',
        width: tokens.width,

        selectors: {
          ':focus': {
            border: tokens.borderFocused,
            boxShadow: tokens.boxShadowFocused,
            selectors: {
              [HighContrastSelector]: {
                boxShadow: tokens.highContrastBoxShadowFocused,
              },
            },
          },
          ':hover': {
            boxShadow: tokens.boxShadowHovered,
            selectors: {
              [HighContrastSelector]: {
                boxShadow: tokens.highContrastBoxShadowHovered,
              },
            },
          },
          [HighContrastSelector]: {
            boxShadow: tokens.highContrastBoxShadow,
          },
        },
      },
    ],
  };
};
