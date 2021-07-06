import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const QuoteIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M9 6.5a2.5 2.5 0 10-1.174 2.12 8.802 8.802 0 01-.952 2.764c-.649 1.18-1.476 2.011-2.228 2.762a.5.5 0 00.708.708l.011-.012c.747-.747 1.664-1.664 2.386-2.976C8.48 10.538 9 8.83 9 6.5zM14.826 8.62A2.5 2.5 0 1116 6.5c0 2.33-.52 4.038-1.25 5.366-.721 1.312-1.638 2.23-2.384 2.976l-.012.012a.5.5 0 01-.708-.708c.752-.751 1.579-1.581 2.228-2.762a8.8 8.8 0 00.952-2.765z" />
      </g>
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M7.826 8.62a8.802 8.802 0 01-.952 2.764c-.649 1.18-1.476 2.011-2.228 2.762a.5.5 0 00.708.708l.011-.012c.747-.747 1.664-1.664 2.386-2.976C8.48 10.538 9 8.83 9 6.5a2.5 2.5 0 10-1.174 2.12zM8 6.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM14.826 8.62a8.8 8.8 0 01-.952 2.764c-.649 1.18-1.476 2.011-2.228 2.762a.5.5 0 00.708.708l.012-.012c.746-.747 1.663-1.664 2.385-2.976C15.48 10.538 16 8.83 16 6.5a2.5 2.5 0 10-1.174 2.12zM13.5 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
      </g>
    </svg>
  ),
  displayName: 'QuoteIcon',
});
