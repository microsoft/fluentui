import { getGlobalClassNames } from '../../Styling';
import { IDocumentCardImageStyleProps, IDocumentCardImageStyles } from './DocumentCardImage.types';

export const GlobalClassNames = {
  root: 'ms-DocumentCardImage',
  icon: 'ms-DocumentCardImage-icon',
  centeredIcon: 'ms-DocumentCardImage-centeredIcon',
  centeredIconContainer: 'ms-DocumentCardImage-centeredIconContainer',
  cornerIcon: 'ms-DocumentCardImage-cornerIcon'
};

export const getStyles = (props: IDocumentCardImageStyleProps): IDocumentCardImageStyles => {
  const { theme, className, height, width, cornerIconSize, centeredIconSize } = props;
  const { palette } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      {
        borderBottom: `1px solid ${palette.neutralLight}`,
        position: 'relative',
        backgroundColor: palette.neutralLighterAlt,
        overflow: `hidden`,
        height: height && `${height}px`,
        width: width && `${width}px`
      },
      className
    ],
    centeredIcon: [
      classNames.centeredIcon,
      {
        height: centeredIconSize,
        width: centeredIconSize
      }
    ],
    centeredIconWrapper: [
      classNames.centeredIconContainer,
      {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0
      }
    ],
    cornerIcon: [
      classNames.cornerIcon,
      {
        left: '10px',
        bottom: '10px',
        height: cornerIconSize,
        width: cornerIconSize,
        position: 'absolute',
        overflow: 'visible'
      }
    ]
  };
};
