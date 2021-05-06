import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const FontColorIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg viewBox="2 2 16 16" role="presentation" focusable="false" className={classes.svg}>
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.4642 2.3143C10.3883 2.12448 10.2045 2 10 2C9.79556 2 9.6117 2.12448 9.53577 2.3143L6.53577 9.8143C6.43322 10.0707 6.55792 10.3617 6.81432 10.4642C7.07071 10.5668 7.36169 10.4421 7.46425 10.1857L8.53707 7.50364H11.4629L12.5358 10.1857C12.6383 10.4421 12.9293 10.5668 13.1857 10.4642C13.4421 10.3617 13.5668 10.0707 13.4642 9.8143L10.4642 2.3143ZM10 3.84629L11.0629 6.50364H8.93707L10 3.84629Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.5 12C3.67157 12 3 12.6716 3 13.5V16.5C3 17.3284 3.67157 18 4.5 18H15.5C16.3284 18 17 17.3284 17 16.5V13.5C17 12.6716 16.3284 12 15.5 12H4.5ZM4 13.5C4 13.2239 4.22386 13 4.5 13H15.5C15.7761 13 16 13.2239 16 13.5V16.5C16 16.7761 15.7761 17 15.5 17H4.5C4.22386 17 4 16.7761 4 16.5V13.5Z"
        />
      </g>
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.4642 2.3143C10.3883 2.12448 10.2045 2 10 2C9.79556 2 9.6117 2.12448 9.53577 2.3143L6.53577 9.8143C6.43322 10.0707 6.55792 10.3617 6.81432 10.4642C7.07071 10.5668 7.36169 10.4421 7.46425 10.1857L8.53707 7.50364H11.4629L12.5358 10.1857C12.6383 10.4421 12.9293 10.5668 13.1857 10.4642C13.4421 10.3617 13.5668 10.0707 13.4642 9.8143L10.4642 2.3143ZM10 3.84629L11.0629 6.50364H8.93707L10 3.84629Z"
        />
        <path d="M4.5 12C3.67157 12 3 12.6716 3 13.5V16.5C3 17.3284 3.67157 18 4.5 18H15.5C16.3284 18 17 17.3284 17 16.5V13.5C17 12.6716 16.3284 12 15.5 12H4.5Z" />
      </g>
    </svg>
  ),
  displayName: 'FontColorIcon',
});
