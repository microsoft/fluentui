import { getGlobalClassNames, FontSizes } from '../../Styling';
import { IDocumentCardPreviewStyleProps, IDocumentCardPreviewStyles } from './DocumentCardPreview.types';

export const GlobalClassNames = {
  root: 'ms-DocumentCardPreview',
  icon: 'ms-DocumentCardPreview-icon',
  previewFileTypeIcon: 'ms-DocumentCardPreview-icon'
};

export const getStyles = (props: IDocumentCardPreviewStyleProps): IDocumentCardPreviewStyles => {
  const { theme, className, isFileList, previewIconClassName } = props;
  const { palette } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      {
        borderBottom: `1px solid ${palette.neutralLight}`,
        position: 'relative',
        backgroundColor: isFileList ? palette.white : palette.neutralLighterAlt,
        overflow: `hidden`
      },
      className
    ],
    previewIcon: [
      {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
      },
      previewIconClassName
    ],
    previewFileTypeIcon: [
      classNames.previewFileTypeIcon,
      {
        left: '10px',
        bottom: '10px',
        position: 'absolute'
      }
    ],
    fileList: {
      padding: '16px 16px 0 16px',
      listStyleType: 'none',
      margin: 0,
      selectors: {
        li: {
          height: '16px',
          lineHeight: '16px',
          marginBottom: '8px',
          overflow: 'hidden',
          paddingLeft: '24px',
          position: 'relative',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        },
        a: {
          fontSize: FontSizes.small,
          textDecoration: 'none',
          color: palette.neutralDark,
          selectors: {
            ':hover': {
              color: palette.themePrimary
            }
          }
        }
      }
    },
    fileListIcon: {
      left: 0,
      position: 'absolute',
      top: 0
    },
    fileListOverflowText: {
      padding: '0px 16px 8px 16px',
      display: 'block',
      fontSize: FontSizes.small
    }
  };
};
