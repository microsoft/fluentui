import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const ChevronStartIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svgFlippingInRtl}>
      <g>
        <path
          className={cx(iconClassNames.outline, classes.outlinePart)}
          d="M19 22.97c0 .14-.05.25-.15.35a.485.485 0 0 1-.7 0l-7-7a.485.485 0 0 1 0-.7l7-7a.485.485 0 0 1 .7 0c.1.1.15.21.15.35 0 .14-.05.25-.15.35l-6.64 6.65 6.64 6.65c.1.1.15.21.15.35z"
        />
        <path
          className={cx(iconClassNames.filled, classes.filledPart)}
          d="M19.5 8.97c0 .14-.03.27-.07.39-.05.12-.12.23-.21.32l-6.3 6.29 6.3 6.29c.09.09.17.2.21.32a1.036 1.036 0 0 1-.01.77c-.05.12-.13.23-.22.32s-.2.16-.32.22a.995.995 0 0 1-1.09-.21l-7-7c-.19-.19-.29-.43-.29-.71s.1-.52.29-.71l7-7a.995.995 0 0 1 1.09-.21c.12.06.23.13.32.22s.16.2.22.32c.05.12.08.25.08.38z"
        />
      </g>
    </svg>
  ),
  displayName: 'ChevronStartIcon',
});
