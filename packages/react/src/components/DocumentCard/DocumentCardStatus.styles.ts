import { getGlobalClassNames } from '../../Styling';
import type { IDocumentCardStatusStyleProps, IDocumentCardStatusStyles } from './DocumentCardStatus.types';

const GlobalClassNames = {
  root: 'ms-DocumentCardStatus',
};

export const getStyles = (props: IDocumentCardStatusStyleProps): IDocumentCardStatusStyles => {
  const { className, theme } = props;
  const { palette, fonts } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      fonts.medium,
      {
        margin: '8px 16px',
        color: palette.neutralPrimary,
        backgroundColor: palette.neutralLighter,
        height: '32px',
      },
      className,
    ],
  };
};
