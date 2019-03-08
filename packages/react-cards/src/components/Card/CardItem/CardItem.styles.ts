import { getGlobalClassNames } from '@uifabric/styling';
import { ICardItemComponent, ICardItemStylesReturnType, ICardItemTokenReturnType } from './CardItem.types';

const GlobalClassNames = {
  root: 'ms-CardItem'
};

const baseTokens: ICardItemComponent['tokens'] = {
  margin: 0
};

export const CardTokens: ICardItemComponent['tokens'] = (props, theme): ICardItemTokenReturnType => [baseTokens];

export const CardItemStyles: ICardItemComponent['styles'] = (props, theme, tokens): ICardItemStylesReturnType => {
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      theme.fonts.medium,
      classNames.root,
      {
        margin: tokens.margin,
        width: 'auto',
        height: 'auto'
      }
    ]
  };
};
