import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const EyeFriendlierIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path
          className={cx(iconClassNames.outline, classes.outlinePart)}
          d="M16 20c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zm0-5c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.898-2-2-2zm7.667 1.972a.501.501 0 0 0 .305-.639C22.839 13.143 19.636 11 16 11c-3.482 0-6.684 2.135-7.964 5.314a.5.5 0 0 0 .928.373C10.094 13.884 12.92 12 16 12c3.213 0 6.038 1.876 7.028 4.667a.5.5 0 0 0 .639.305z"
        />
        <path
          className={cx(iconClassNames.filled, classes.filledPart)}
          d="M16 20c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zm7.667-3.028a.501.501 0 0 0 .305-.639C22.839 13.143 19.636 11 16 11c-3.482 0-6.684 2.135-7.964 5.314a.5.5 0 0 0 .928.373C10.094 13.884 12.92 12 16 12c3.213 0 6.038 1.876 7.028 4.667a.5.5 0 0 0 .639.305z"
        />
      </g>
    </svg>
  ),
  displayName: 'EyeFriendlierIcon',
});
