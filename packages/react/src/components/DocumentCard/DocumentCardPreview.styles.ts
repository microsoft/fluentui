import { getFocusStyle, getGlobalClassNames, HighContrastSelector } from '../../Styling';
import { IsFocusVisibleClassName } from '../../Utilities';
import type { IDocumentCardPreviewStyleProps, IDocumentCardPreviewStyles } from './DocumentCardPreview.types';

export const DocumentCardPreviewGlobalClassNames = {
  root: 'ms-DocumentCardPreview',
  icon: 'ms-DocumentCardPreview-icon',
  iconContainer: 'ms-DocumentCardPreview-iconContainer',
};

export const getStyles = (props: IDocumentCardPreviewStyleProps): IDocumentCardPreviewStyles => {
  const { theme, className, isFileList } = props;
  const { palette, fonts } = theme;

  const classNames = getGlobalClassNames(DocumentCardPreviewGlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      fonts.small,
      {
        backgroundColor: isFileList ? palette.white : palette.neutralLighterAlt,
        borderBottom: `1px solid ${palette.neutralLight}`,
        overflow: `hidden`,
        position: 'relative',
      },
      className,
    ],
    previewIcon: [
      classNames.iconContainer,
      {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      },
    ],
    icon: [
      classNames.icon,
      {
        left: '10px',
        bottom: '10px',
        position: 'absolute',
      },
    ],
    fileList: {
      padding: '16px 16px 0 16px',
      listStyleType: 'none',
      margin: 0,
      selectors: {
        li: {
          height: '16px',
          lineHeight: '16px',
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'center',
          marginBottom: '8px',
          overflow: 'hidden',
        },
      },
    },
    fileListIcon: {
      display: 'inline-block',
      flexShrink: 0,
      marginRight: '8px',
    },
    fileListLink: [
      getFocusStyle(theme, {
        highContrastStyle: {
          border: '1px solid WindowText',
          outline: 'none',
        },
      }),
      {
        boxSizing: 'border-box',
        color: palette.neutralDark,
        flexGrow: 1,
        overflow: 'hidden',
        display: 'inline-block',
        textDecoration: 'none',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        selectors: {
          ':hover': {
            color: palette.themePrimary,
          },
          [`.${IsFocusVisibleClassName} &:focus, :host(.${IsFocusVisibleClassName}) &:focus`]: {
            selectors: {
              [HighContrastSelector]: {
                outline: 'none',
              },
            },
          },
        },
      },
    ],
    fileListOverflowText: {
      padding: '0px 16px 8px 16px',
      display: 'block',
    },
  };
};
