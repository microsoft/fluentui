import { getGlobalClassNames } from '@uifabric/styling';
import { ICardItemComponent, ICardItemStylesReturnType, ICardItemTokenReturnType } from './CardItem.types';

const GlobalClassNames = {
  root: 'ms-CardItem'
};

const baseTokens: ICardItemComponent['tokens'] = {
  padding: 0
};

const filledTokens: ICardItemComponent['tokens'] = {
  margin: 0
};

export const CardItemTokens: ICardItemComponent['tokens'] = (props, theme): ICardItemTokenReturnType => [
  baseTokens,
  props.fill && filledTokens
];

export const CardItemStyles: ICardItemComponent['styles'] = (props, theme, tokens): ICardItemStylesReturnType => {
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      theme.fonts.large,
      classNames.root,
      {
        margin: tokens.margin,
        padding: tokens.padding
      }
    ]
  };
};
