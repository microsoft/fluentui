import { getGlobalClassNames } from '../../Styling';
import { DEFAULT_CELL_STYLE_PROPS } from '../DetailsList/DetailsRow.styles';
import type { IGroupFooterStyleProps, IGroupFooterStyles } from './GroupFooter.types';

const GlobalClassNames = {
  root: 'ms-groupFooter',
  title: 'ms-GroupFooter-title',
};

export const getStyles = (props: IGroupFooterStyleProps): IGroupFooterStyles => {
  const { theme, className } = props;
  const classNames = getGlobalClassNames(GlobalClassNames, theme!);
  const { cellLeftPadding } = DEFAULT_CELL_STYLE_PROPS;
  return {
    root: [
      theme.fonts.medium,
      classNames.root,
      {
        position: 'relative',
        padding: '5px 38px',
      },
      className,
    ],
    title: [
      classNames.title,
      {
        paddingLeft: cellLeftPadding,
      },
    ],
  };
};
