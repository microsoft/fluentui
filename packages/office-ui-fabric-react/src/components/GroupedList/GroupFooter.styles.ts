import { IGroupFooterStyleProps, IGroupFooterStyles } from './GroupFooter.types';
import { getGlobalClassNames, FontSizes } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-groupFooter',
  link: 'ms-Link'
};

export const getStyles = (props: IGroupFooterStyleProps): IGroupFooterStyles => {
  const { theme, className } = props;
  const classNames = getGlobalClassNames(GlobalClassNames, theme!);

  return {
    root: [
      classNames.root,
      {
        position: 'relative',
        padding: '5px 38px',
        selectors: {
          [`:global(.${classNames.link}`]: {
            fontSize: FontSizes.small
          }
        }
      },
      className
    ]
  };
};
