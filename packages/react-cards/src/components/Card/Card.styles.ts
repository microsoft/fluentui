import { getGlobalClassNames } from '@uifabric/styling';
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
  boxShadowHovered: Depths.depth8
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
        boxShadow: tokens.boxShadow,
        height: tokens.height,
        padding: tokens.padding,
        width: tokens.width,
        minWidth: tokens.minWidth,
        maxWidth: tokens.maxWidth,
        transition: 'box-shadow 0.5s ease',

        selectors: {
          ':hover': {
            boxShadow: tokens.boxShadowHovered
          }
        }
      }
    ]
  };
};
