'use client';

import { makeStyles, tokens } from '@fluentui/react-components';

const iconSize = '32px';

export const useAttachmentIconStyles = makeStyles({
  root: {
    height: iconSize,
    width: iconSize,
    marginRight: tokens.spacingHorizontalM,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg, & .fui-Icon-font': {
      height: '100%',
      width: '100%',
    },
    '& .fui-Icon-font': {
      fontSize: `${tokens.fontSizeHero800} !important`,
    },
  },
});
