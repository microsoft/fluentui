import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const MicOffIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M12 5v4.879l.898.898c.067-.248.102-.508.102-.777V5a3 3 0 00-5.998-.119L8 5.879V5a2 2 0 114 0zM7 7.707L2.146 2.854a.5.5 0 11.708-.708l15 15a.5.5 0 01-.708.708l-3.627-3.627a5.475 5.475 0 01-3.019 1.25V17.5a.5.5 0 01-1 0v-2.022A5.5 5.5 0 014.5 10a.5.5 0 011 0 4.5 4.5 0 007.309 3.516l-1.07-1.07A3 3 0 017 10V7.706zm4.016 4.016L8 8.707V10a2 2 0 003.016 1.723zM14.803 12.682l-.742-.742A4.481 4.481 0 0014.5 10a.5.5 0 011 0c0 .974-.253 1.888-.697 2.682z" />
      </g>
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M13 10c0 .27-.035.53-.102.777L7.002 4.881A3 3 0 0113 5v5zM7 7.707V10a3 3 0 004.738 2.445l1.07 1.07A4.5 4.5 0 015.5 10a.5.5 0 00-.999.001 5.5 5.5 0 005 5.478V17.5a.5.5 0 001 0v-2.022a5.475 5.475 0 003.02-1.251l3.626 3.627a.5.5 0 00.708-.707l-15-15a.5.5 0 10-.708.707L7 7.707zM14.803 12.682A5.474 5.474 0 0015.5 10a.5.5 0 00-1 0c0 .695-.157 1.353-.439 1.94l.742.742z" />
      </g>
    </svg>
  ),
  displayName: 'MicOffIcon',
});
