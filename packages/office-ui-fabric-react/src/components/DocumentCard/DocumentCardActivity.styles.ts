import { getGlobalClassNames, FontSizes, FontWeights } from '../../Styling';
import { IDocumentCardActivityStyleProps, IDocumentCardActivityStyles } from './DocumentCardActivity.types';

const verticalPadding = 8;
const horizontalPadding = 16;
const imageSize = 32;
const personaTextGutter = 8;

export const GlobalClassNames = {
  root: 'ms-DocumentCardActivity',
  multiplePeople: 'ms-DocumentCardActivity--multiplePeople',
  details: 'ms-DocumentCardActivity-details',
  name: 'ms-DocumentCardActivity-name',
  activity: 'ms-DocumentCardActivity-activity',
  avatars: 'ms-DocumentCardActivity-avatars',
  avatar: 'ms-DocumentCardActivity-avatar'
};

export const getStyles = (props: IDocumentCardActivityStyleProps): IDocumentCardActivityStyles => {
  const { theme, className, multiplePeople } = props;
  const { palette } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      multiplePeople && classNames.multiplePeople,
      {
        padding: `${verticalPadding}px ${horizontalPadding}px`,
        position: 'relative'
      },
      className
    ],
    avatars: [
      classNames.avatars,
      {
        marginLeft: '-2px', // Avatars sit outside of the usual padding for visual balance
        height: '32px'
      }
    ],
    avatar: [
      classNames.avatar,
      {
        display: 'inline-block',
        verticalAlign: 'top',
        position: 'relative',
        textAlign: 'center',
        width: imageSize,
        height: imageSize,

        selectors: {
          '&:after': {
            content: '" "',
            position: 'absolute',
            left: '-1px',
            top: '-1px',
            right: '-1px',
            bottom: '-1px',
            border: `2px solid ${palette.white}`, // Match the background of the card
            borderRadius: '50%'
          },
          ':nth-of-type(2)': multiplePeople && {
            marginLeft: '-16px'
          }
        }
      }
    ],
    details: [
      classNames.details,
      {
        left: multiplePeople
          ? `${horizontalPadding + imageSize * 1.5 + personaTextGutter}px`
          : `${horizontalPadding + imageSize + personaTextGutter}px`,
        height: imageSize,
        position: 'absolute',
        top: verticalPadding,
        width: `calc(100% - #{horizontalPadding + imageSize + personaTextGutter + horizontalPadding}px)`
      }
    ],
    name: [
      classNames.name,
      {
        display: 'block',
        fontSize: FontSizes.small,
        lineHeight: '15px',
        height: '15px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: palette.neutralPrimary,
        fontWeight: FontWeights.semibold
      }
    ],
    activity: [
      classNames.activity,
      {
        display: 'block',
        fontSize: FontSizes.small,
        lineHeight: '15px',
        height: '15px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: palette.neutralSecondary
      }
    ]
  };
};
