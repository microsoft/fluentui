import { IGroupShowAllProps, IGroupShowAllStyleProps, IGroupShowAllStyles } from './GroupShowAll.types';
import { getGlobalClassNames } from '../../Styling';

export { IGroupShowAllProps };

const GlobalClassNames = {
  root: 'ms-GroupShowAll',
  link: 'ms-Link'
};

export const getStyles = (props: IGroupShowAllStyleProps): IGroupShowAllStyles => {
  const { theme } = props;
  const { fonts } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      {
        position: 'relative',
        padding: '10px 84px',
        cursor: 'pointer',
        selectors: {
          [`.${classNames.link}`]: {
            fontSize: fonts.small.fontSize
          }
        }
      }
    ]
  };
};
