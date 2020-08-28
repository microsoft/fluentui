import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const ChevronEndIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svgFlippingInRtl}>
      <g>
        <path
          className={cx(iconClassNames.outline, classes.outlinePart)}
          d="M21 15.97c0 .14-.05.25-.15.35l-7 7a.485.485 0 0 1-.7 0 .485.485 0 0 1 0-.7l6.64-6.65-6.64-6.65a.485.485 0 0 1 0-.7.485.485 0 0 1 .7 0l7 7c.1.1.15.21.15.35z"
        />
        <path
          className={cx(iconClassNames.filled, classes.filledPart)}
          d="M21.5 15.97c0 .28-.1.52-.29.71l-7 7c-.19.19-.43.29-.71.29-.14 0-.26-.03-.38-.08s-.23-.13-.32-.22-.16-.2-.22-.32a1.036 1.036 0 0 1-.01-.77c.05-.12.12-.23.21-.32l6.3-6.29-6.3-6.29a.85.85 0 0 1-.21-.32c-.05-.13-.07-.26-.07-.39a.995.995 0 0 1 .3-.7c.09-.09.2-.16.32-.22.12-.05.24-.08.38-.08.28 0 .52.1.71.29l7 7c.19.19.29.43.29.71z"
        />
      </g>
    </svg>
  ),
  displayName: 'ChevronEndIcon',
});
