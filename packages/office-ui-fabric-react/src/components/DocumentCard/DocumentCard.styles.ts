import { getGlobalClassNames, FontSizes } from '../../Styling';
import { IDocumentCardStyleProps, IDocumentCardStyles } from './DocumentCard.types';
import { DocumentCardPreviewGlobalClassNames as previewClassNames } from './DocumentCardPreview.styles';
import { DocumentCardActivityGlobalClassNames as activityClassNames } from './DocumentCardActivity.styles';
import { DocumentCardTitleGlobalClassNames as titleClassNames } from './DocumentCardTitle.styles';
import { DocumentCardLocationGlobalClassNames as locationClassNames } from './DocumentCardLocation.styles';

const GlobalClassNames = {
  root: 'ms-DocumentCard',
  rootActionable: 'ms-DocumentCard--actionable',
  rootCompact: 'ms-DocumentCard--compact'
};

export const getStyles = (props: IDocumentCardStyleProps): IDocumentCardStyles => {
  const { className, theme, actionable, compact } = props;
  const { palette } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      {
        WebkitFontSmoothing: 'antialiased',
        backgroundColor: palette.white,
        border: `1px solid ${palette.neutralLight}`,
        boxSizing: 'border-box',
        maxWidth: '320px',
        minWidth: '206px',
        userSelect: 'none',
        position: 'relative',
        selectors: {
          [`.${locationClassNames.root} + .${titleClassNames.root}`]: {
            paddingTop: '4px'
          }
        }
      },
      actionable && [
        classNames.rootActionable,
        {
          selectors: {
            ':hover': {
              cursor: 'pointer',
              borderColor: palette.neutralTertiaryAlt
            },
            ':hover:after': {
              content: '" "',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              border: `1px solid ${palette.neutralTertiaryAlt}`,
              pointerEvents: 'none'
            }
          }
        }
      ],
      compact && [
        classNames.rootCompact,
        {
          display: 'flex',
          maxWidth: '480px',
          height: '109px',
          selectors: {
            [`.${previewClassNames.root}`]: {
              borderRight: `1px solid ${palette.neutralLight}`,
              borderBottom: 0, // Remove the usual border from the preview
              maxHeight: '106px',
              maxWidth: '144px'
            },
            [`.${previewClassNames.icon}`]: {
              maxHeight: '32px',
              maxWidth: '32px'
            },
            [`.${activityClassNames.root}`]: {
              paddingBottom: '12px'
            },
            [`.${titleClassNames.root}`]: {
              paddingBottom: '12px 16px 8px 16px',
              fontSize: FontSizes.mediumPlus,
              lineHeight: '16px'
            }
          }
        }
      ],
      className
    ]
  };
};
