import { getGlobalClassNames } from '../../Styling';
import { IDocumentCardTitleStyleProps, IDocumentCardTitleStyles } from './DocumentCardTitle.types';

export const DocumentCardTitleGlobalClassNames = {
  root: 'ms-DocumentCardTitle',
};

export const getStyles = (props: IDocumentCardTitleStyleProps): IDocumentCardTitleStyles => {
  const { theme, className, showAsSecondaryTitle } = props;
  const { palette, fonts } = theme;

  const classNames = getGlobalClassNames(DocumentCardTitleGlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      showAsSecondaryTitle ? fonts.medium : fonts.large,
      {
        padding: '8px 16px',
        display: 'block',
        overflow: 'hidden',
        wordWrap: 'break-word',
        height: showAsSecondaryTitle ? '45px' : '38px',
        lineHeight: showAsSecondaryTitle ? '18px' : '21px',
        color: showAsSecondaryTitle ? palette.neutralSecondary : palette.neutralPrimary,
      },
      className,
    ],
  };
};
