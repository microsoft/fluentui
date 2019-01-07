import { getGlobalClassNames } from '../../Styling';
import { IDocumentCardStyleProps, IDocumentCardStyles } from './DocumentCard.types';

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
        position: 'relative'
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
          height: '109px'
        }
      ],
      className
    ]
  };
};
