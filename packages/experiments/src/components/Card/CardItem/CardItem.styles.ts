import { getGlobalClassNames } from '../../../Styling';
import { ICardItemComponent, ICardItemStylesReturnType } from './CardItem.types';

const GlobalClassNames = {
  root: 'ms-CardItem'
};

export const styles: ICardItemComponent['styles'] = (props, theme): ICardItemStylesReturnType => {
  const { preventPadding } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      theme.fonts.medium,
      classNames.root,
      {
        width: 'auto',
        height: 'auto'
      },
      preventPadding && {
        marginLeft: '-12px',
        marginRight: '-13px'
      }
    ]
  };
};
