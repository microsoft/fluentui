import { getGlobalClassNames, FontWeights } from '../../Styling';
import type { IDocumentCardLocationStyleProps, IDocumentCardLocationStyles } from './DocumentCardLocation.types';

export const DocumentCardLocationGlobalClassNames = {
  root: 'ms-DocumentCardLocation',
};

export const getStyles = (props: IDocumentCardLocationStyleProps): IDocumentCardLocationStyles => {
  const { theme, className } = props;
  const { palette, fonts } = theme;

  const classNames = getGlobalClassNames(DocumentCardLocationGlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      fonts.small,
      {
        color: palette.themePrimary,
        display: 'block',
        fontWeight: FontWeights.semibold,
        overflow: 'hidden',
        padding: '8px 16px',
        position: 'relative',
        textDecoration: 'none',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',

        selectors: {
          ':hover': {
            color: palette.themePrimary,
            cursor: 'pointer',
          },
        },
      },
      className,
    ],
  };
};
