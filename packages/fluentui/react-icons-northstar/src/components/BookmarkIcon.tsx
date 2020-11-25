import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const BookmarkIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M4 4.5C4 3.11929 5.11929 2 6.5 2H13.5C14.8807 2 16 3.11929 16 4.5V17.5C16 17.6881 15.8945 17.8602 15.7269 17.9456C15.5593 18.0309 15.358 18.015 15.2059 17.9044L10 14.1182L4.79409 17.9044C4.64199 18.015 4.4407 18.0309 4.27311 17.9456C4.10553 17.8602 4 17.6881 4 17.5V4.5ZM6.5 3C5.67157 3 5 3.67157 5 4.5V16.5181L9.70592 13.0956C9.88124 12.9681 10.1188 12.9681 10.2941 13.0956L15 16.5181V4.5C15 3.67157 14.3284 3 13.5 3H6.5Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M4 4.5C4 3.11929 5.11929 2 6.5 2H13.5C14.8807 2 16 3.11929 16 4.5V17.5C16 17.6881 15.8945 17.8602 15.7269 17.9456C15.5593 18.0309 15.358 18.015 15.2059 17.9044L10 14.1183L4.79409 17.9044C4.64199 18.015 4.4407 18.0309 4.27311 17.9456C4.10553 17.8602 4 17.6881 4 17.5V4.5Z"
      />
    </svg>
  ),
  displayName: 'BookmarkIcon',
});
