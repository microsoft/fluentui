import { getGlobalClassNames, FontWeights } from '../../Styling';
import type { IDocumentCardActivityStyleProps, IDocumentCardActivityStyles } from './DocumentCardActivity.types';

const VERTICAL_PADDING = 8;
const HORIZONTAL_PADDING = 16;
const IMAGE_SIZE = 32;
const PERSONA_TEXT_GUTTER = 8;

export const DocumentCardActivityGlobalClassNames = {
  root: 'ms-DocumentCardActivity',
  multiplePeople: 'ms-DocumentCardActivity--multiplePeople',
  details: 'ms-DocumentCardActivity-details',
  name: 'ms-DocumentCardActivity-name',
  activity: 'ms-DocumentCardActivity-activity',
  avatars: 'ms-DocumentCardActivity-avatars',
  avatar: 'ms-DocumentCardActivity-avatar',
};

export const getStyles = (props: IDocumentCardActivityStyleProps): IDocumentCardActivityStyles => {
  const { theme, className, multiplePeople } = props;
  const { palette, fonts } = theme;

  const classNames = getGlobalClassNames(DocumentCardActivityGlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      multiplePeople && classNames.multiplePeople,
      {
        padding: `${VERTICAL_PADDING}px ${HORIZONTAL_PADDING}px`,
        position: 'relative',
      },
      className,
    ],
    avatars: [
      classNames.avatars,
      {
        marginLeft: '-2px', // Avatars sit outside of the usual padding for visual balance
        height: '32px',
      },
    ],
    avatar: [
      classNames.avatar,
      {
        display: 'inline-block',
        verticalAlign: 'top',
        position: 'relative',
        textAlign: 'center',
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,

        selectors: {
          '&:after': {
            content: '" "',
            position: 'absolute',
            left: '-1px',
            top: '-1px',
            right: '-1px',
            bottom: '-1px',
            border: `2px solid ${palette.white}`, // Match the background of the card
            borderRadius: '50%',
          },
          ':nth-of-type(2)': multiplePeople && {
            marginLeft: '-16px',
          },
        },
      },
    ],
    details: [
      classNames.details,
      {
        left: multiplePeople
          ? `${HORIZONTAL_PADDING + IMAGE_SIZE * 1.5 + PERSONA_TEXT_GUTTER}px`
          : `${HORIZONTAL_PADDING + IMAGE_SIZE + PERSONA_TEXT_GUTTER}px`,
        height: IMAGE_SIZE,
        position: 'absolute',
        top: VERTICAL_PADDING,
        width: `calc(100% - ${HORIZONTAL_PADDING + IMAGE_SIZE + PERSONA_TEXT_GUTTER + HORIZONTAL_PADDING}px)`,
      },
    ],
    name: [
      classNames.name,
      {
        display: 'block',
        fontSize: fonts.small.fontSize,
        lineHeight: '15px',
        height: '15px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: palette.neutralPrimary,
        fontWeight: FontWeights.semibold,
      },
    ],
    activity: [
      classNames.activity,
      {
        display: 'block',
        fontSize: fonts.small.fontSize,
        lineHeight: '15px',
        height: '15px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: palette.neutralSecondary,
      },
    ],
  };
};
