import {
  createCustomFocusIndicatorStyle,
  makeResetStyles,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import { attachmentActionClassName } from './AttachmentAction';
import { attachmentIconClassName } from './AttachmentIcon';

export const useAttachmentBaseStyles = makeResetStyles({
  ...createCustomFocusIndicatorStyle(
    {
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      borderRadius: tokens.borderRadiusMedium,
      backgroundColor: undefined,
      color: undefined,
      [`& .${attachmentActionClassName}`]: {
        color: undefined,
      },

      [`& .${attachmentIconClassName}`]: {
        color: undefined,
      },
    },
    { selector: 'focus' },
  ),
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  width: '100%',
  maxWidth: '424px',
  minHeight: '32px',
  ...shorthands.padding('7px', '3px', '7px', '11px'),
  marginBottom: '2px',
  marginRight: '2px',
  backgroundColor: tokens.colorNeutralBackground6,
  color: tokens.colorNeutralForeground1,
  boxShadow: `0 .2rem .4rem -.075rem ${tokens.colorNeutralShadowAmbient}`,
  ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke3),
  borderRadius: '4px',
});

export const useAttachmentStyles = makeStyles({
  actionable: {
    cursor: 'pointer',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground4Hover,
    },
  },
  progressContainer: {
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
    bottom: 0,
    height: '4px',
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
  },
  progressBar: {
    backgroundColor: tokens.colorPaletteLightGreenBackground3,
    height: '100%',
    maxWidth: '100%',
    transition: 'width 0.2s',
  },
});
