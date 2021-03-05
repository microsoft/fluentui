import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const BroadcastViewFullscreenIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M23.143 11.429H8.857a.857.857 0 0 0-.857.857v7.429a.857.857 0 0 0 .857.857h14.286a.857.857 0 0 0 .857-.858v-7.428a.857.857 0 0 0-.857-.857zm.286 8.286a.286.286 0 0 1-.286.286H8.857a.286.286 0 0 1-.286-.286v-7.429A.286.286 0 0 1 8.857 12h14.286a.286.286 0 0 1 .286.286z"
      />
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M9.143 12.571h13.714v6.857H9.143z" />
        <path d="M23.143 11.429H8.857a.857.857 0 0 0-.857.857v7.429a.857.857 0 0 0 .857.857h14.286a.857.857 0 0 0 .857-.858v-7.428a.857.857 0 0 0-.857-.857zm.286 8.286a.286.286 0 0 1-.286.286H8.857a.286.286 0 0 1-.286-.286v-7.429A.286.286 0 0 1 8.857 12h14.286a.286.286 0 0 1 .286.286z" />
      </g>
    </svg>
  ),
  displayName: 'BroadcastViewFullscreenIcon',
});
