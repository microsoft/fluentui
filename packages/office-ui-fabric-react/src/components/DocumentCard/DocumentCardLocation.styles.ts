import { getGlobalClassNames } from '../../Styling';
import { IDocumentCardLocationStyleProps, IDocumentCardLocationStyles } from './DocumentCardLocation.types';

export const DocumentCardLocationGlobalClassNames = {
  root: 'ms-DocumentCardLocation'
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
        color: palette.neutralPrimary,
        display: 'block',
        padding: '8px 16px',
        position: 'relative',
        textDecoration: 'none',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',

        selectors: {
          ':hover': {
            color: palette.themePrimary,
            cursor: 'pointer'
          }
        }
      },
      className
    ]
  };
};
