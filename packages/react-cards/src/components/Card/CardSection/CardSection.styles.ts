import { getGlobalClassNames } from '@fluentui/react/lib/Styling';
import { ICardSectionComponent, ICardSectionStylesReturnType, ICardSectionTokenReturnType } from './CardSection.types';

const GlobalClassNames = {
  root: 'ms-CardSection',
};

const baseTokens: ICardSectionComponent['tokens'] = {
  padding: 0,
};

const filledTokens: ICardSectionComponent['tokens'] = {
  margin: 0,
};

/** @deprecated */
export const CardSectionTokens: ICardSectionComponent['tokens'] = (props, theme): ICardSectionTokenReturnType => [
  baseTokens,
  props.fill && filledTokens,
];

/** @deprecated */
export const CardSectionStyles: ICardSectionComponent['styles'] = (
  props,
  theme,
  tokens,
): ICardSectionStylesReturnType => {
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
