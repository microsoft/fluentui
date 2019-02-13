import { getGlobalClassNames } from '../../../Styling';
import { ICardItemComponent, ICardItemStylesReturnType } from './CardItem.types';
import { defaultPadding } from '../Card.styles';

const GlobalClassNames = {
  root: 'ms-CardItem'
};

export const styles: ICardItemComponent['styles'] = (props, theme): ICardItemStylesReturnType => {
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
        marginLeft: -defaultPadding,
        marginRight: -defaultPadding - 1
      }
    ]
  };
};
