import type { IDocumentCardImageStyleProps, IDocumentCardImageStyles } from './DocumentCardImage.types';

const centeredIconSize = '42px';
const cornerIconSize = '32px';

export const getStyles = (props: IDocumentCardImageStyleProps): IDocumentCardImageStyles => {
  const { theme, className, height, width } = props;
  const { palette } = theme!;

  return {
    root: [
      {
        borderBottom: `1px solid ${palette.neutralLight}`,
        position: 'relative',
        backgroundColor: palette.neutralLighterAlt,
        overflow: `hidden`,
        height: height && `${height}px`,
        width: width && `${width}px`,
      },
      className,
    ],
    centeredIcon: [
      {
        height: centeredIconSize,
        width: centeredIconSize,
        fontSize: centeredIconSize,
      },
    ],
    centeredIconWrapper: [
      {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      },
    ],
    cornerIcon: [
      {
        left: '10px',
        bottom: '10px',
        height: cornerIconSize,
        width: cornerIconSize,
        fontSize: cornerIconSize,
        position: 'absolute',
        overflow: 'visible',
      },
    ],
  };
};
