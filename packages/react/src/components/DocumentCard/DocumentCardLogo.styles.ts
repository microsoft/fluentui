import { getGlobalClassNames } from '../../Styling';
import type { IDocumentCardLogoStyleProps, IDocumentCardLogoStyles } from './DocumentCardLogo.types';

const GlobalClassNames = {
  root: 'ms-DocumentCardLogo',
};

export const getStyles = (props: IDocumentCardLogoStyleProps): IDocumentCardLogoStyles => {
  const { theme, className } = props;
  const { palette, fonts } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      {
        // eslint-disable-next-line deprecation/deprecation
        fontSize: fonts.xxLargePlus.fontSize,
        color: palette.themePrimary,
        display: 'block',
        padding: '16px 16px 0 16px',
      },
      className,
    ],
  };
};
