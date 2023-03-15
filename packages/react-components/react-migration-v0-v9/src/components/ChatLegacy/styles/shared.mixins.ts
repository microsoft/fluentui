import type { GriffelStyle } from '@fluentui/react-components';
import { createFocusOutlineStyle, shorthands, tokens } from '@fluentui/react-components';

/*
 * This file has styles mixins shared by all chat message components
 */

/** apply focus outline and font styles to chat message */
const bodyBaseStyles: GriffelStyle = {
  position: 'relative',
  ...createFocusOutlineStyle(),

  fontFamily: tokens.fontFamilyBase,
  fontWeight: tokens.fontWeightRegular, // 400
  fontSize: tokens.fontSizeBase300, // 14px
  lineHeight: tokens.lineHeightBase300, // 20px

  color: tokens.colorNeutralForeground1,

  wordBreak: 'break-word',
};

const isOnlyReadableByScreenReaderStyles: GriffelStyle = {
  clip: 'rect(0px, 0px, 0px, 0px)',
  height: '1px',
  ...shorthands.margin('-1px'),
  ...shorthands.overflow('hidden'),
  ...shorthands.padding('0px'),
  width: '1px',
  position: 'absolute',
};

const statusRedStyles: GriffelStyle = {
  color: tokens.colorPaletteRedForeground3,
};

/** apply styles to container of reaction buttons */
const reactionsBaseStyles: GriffelStyle = {
  position: 'relative',
  height: '0px',
  display: 'flex',
};

/**
 * highlight message by background color and stroke color
 */
const highlightAnimation: GriffelStyle = {
  animationIterationCount: '1',
  animationDuration: '4s',
  animationTimingFunction: 'ease-out',
  animationName: {
    from: {
      backgroundColor: tokens.colorPaletteMarigoldBackground1,
      boxShadow: `inset 0 0 0 0.1rem ${tokens.colorPaletteDarkOrangeBorderActive}`,
    },
    to: {
      boxShadow: `inset 0 0 0 0.1rem transparent`,
    },
  },
};

export { bodyBaseStyles, isOnlyReadableByScreenReaderStyles, statusRedStyles, reactionsBaseStyles, highlightAnimation };
