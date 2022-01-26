import { getGlobalClassNames } from '@fluentui/react/lib/Styling';
import { ICardItemComponent, ICardItemStylesReturnType, ICardItemTokenReturnType } from './CardItem.types';

const GlobalClassNames = {
  root: 'ms-CardItem',
};

const baseTokens: ICardItemComponent['tokens'] = {
  padding: 0,
};

const filledTokens: ICardItemComponent['tokens'] = {
  margin: 0,
};

/**
 * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
 * future.
 */
export const CardItemTokens: ICardItemComponent['tokens'] = (props, theme): ICardItemTokenReturnType => [
  baseTokens,
  props.fill && filledTokens,
];

/**
 * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
 * future.
 */
export const CardItemStyles: ICardItemComponent['styles'] = (props, theme, tokens): ICardItemStylesReturnType => {
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      theme.fonts.large,
      classNames.root,
      {
        margin: tokens.margin,
        padding: tokens.padding,
      },
    ],
  };
};
