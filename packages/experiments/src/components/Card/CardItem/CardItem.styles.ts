import { getGlobalClassNames } from '../../../Styling';
import { ICardItemComponent, ICardItemStylesReturnType } from './CardItem.types';

const GlobalClassNames = {
  root: 'ms-CardItem'
};

export const CardItemStyles: ICardItemComponent['styles'] = (props, theme): ICardItemStylesReturnType => {
  const { disableChildPadding } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      theme.fonts.medium,
      classNames.root,
      {
        width: 'auto',
        height: 'auto'
      },
      disableChildPadding && {
        marginLeft: -12,
        marginRight: -13
      }
    ]
  };
};
