import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const PresenceAvailableIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM11.7069 6.70739L7.70361 10.7074C7.51595 10.8949 7.26147 11.0002 6.99619 11C6.7309 10.9998 6.47655 10.8943 6.28912 10.7065L4.29233 8.70654C3.90212 8.3157 3.90262 7.68254 4.29346 7.29233C4.6843 6.90212 5.31746 6.90262 5.70767 7.29346L6.99765 8.58551L10.2932 5.29261C10.6839 4.90224 11.3171 4.9025 11.7074 5.29318C12.0978 5.68386 12.0975 6.31703 11.7069 6.70739Z"
      />
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M11.7071 6.70711C12.0976 6.31658 12.0976 5.68342 11.7071 5.29289C11.3166 4.90237 10.6834 4.90237 10.2929 5.29289L7 8.58579L5.70711 7.29289C5.31658 6.90237 4.68342 6.90237 4.29289 7.29289C3.90237 7.68342 3.90237 8.31658 4.29289 8.70711L6.29289 10.7071C6.68342 11.0976 7.31658 11.0976 7.70711 10.7071L11.7071 6.70711Z" />
        <path d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8ZM8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2Z" />
      </g>
    </svg>
  ),
  displayName: 'PresenceAvailableIcon',
});
