'use client';

import { makeStyles } from '@fluentui/react-components';

const iconSize = '32px';

export const useAttachmentIconStyles = makeStyles({
  root: {
    height: iconSize,
    width: iconSize,
    marginRight: '12px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg, & i': {
      height: '100%',
      width: '100%',
    },
    '& i': {
      fontSize: `${iconSize} !important`,
    },
  },
});
