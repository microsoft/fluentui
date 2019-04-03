import { getGlobalClassNames, HighContrastSelector } from '@uifabric/styling';
import { Depths } from '@uifabric/fluent-theme';
import { ICardComponent, ICardStylesReturnType, ICardTokenReturnType } from './Card.types';

const GlobalClassNames = {
  root: 'ms-Card',
  stack: 'ms-Card-stack'
};

const baseTokens: ICardComponent['tokens'] = {
  boxShadow: Depths.depth4,
  childrenGap: 12,
  height: 'inherit',
  highContrastBoxShadow: '0 1.6px 3.6px 0 Highlight, 0 0.3px 0.9px 0 Highlight',
  minHeight: '348px',
  minWidth: '212px',
  maxWidth: '286px',
  padding: 12
};

const compactTokens: ICardComponent['tokens'] = {
  height: 'auto',
  minWidth: '300px',
  maxWidth: '500px'
};

const clickableTokens: ICardComponent['tokens'] = {
  boxShadowHovered: Depths.depth8,
  highContrastBoxShadowHovered: '0 3.2px 7.2px 0 Highlight, 0 0.6px 1.8px 0 Highlight'
};

export const CardTokens: ICardComponent['tokens'] = (props, theme): ICardTokenReturnType => [
  baseTokens,
  props.compact && compactTokens,
  props.onClick && clickableTokens
];

export const CardStyles: ICardComponent['styles'] = (props, theme, tokens): ICardStylesReturnType => {
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      {
        borderRadius: '2px',
        boxShadow: tokens.boxShadow,
        height: tokens.height,
        padding: tokens.padding,
        width: tokens.width,
        minWidth: tokens.minWidth,
        maxWidth: tokens.maxWidth,
        transition: 'box-shadow 0.5s ease',

        selectors: {
          ':hover': {
            boxShadow: tokens.boxShadowHovered,
            selectors: {
              [HighContrastSelector]: {
                boxShadow: tokens.highContrastBoxShadowHovered
              }
            }
          },
          [HighContrastSelector]: {
            boxShadow: tokens.highContrastBoxShadow
          }
        }
      }
    ]
  };
};
