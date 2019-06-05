import { IGroupShowAllProps, IGroupShowAllStyleProps, IGroupShowAllStyles } from './GroupShowAll.types';
import { getGlobalClassNames, FontSizes } from '../../Styling';

export { IGroupShowAllProps };

const GlobalClassNames = {
  root: 'ms-GroupShowAll',
  link: 'ms-Link'
};

export const getStyles = (props: IGroupShowAllStyleProps): IGroupShowAllStyles => {
  const { theme } = props;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      theme.fonts.medium,
      {
        position: 'relative',
        padding: '10px 84px',
        cursor: 'pointer',
        selectors: {
          [`.${classNames.link}`]: {
            fontSize: FontSizes.small
          }
        }
      }
    ]
  };
};
