import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const BoldIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M5.5 4.25C5.5 3.55964 6.05964 3 6.75 3H10.2512C12.654 3 14.25 4.98768 14.25 7C14.25 7.87176 13.9504 8.73837 13.4157 9.44091C14.3205 10.1431 14.9974 11.242 14.9974 12.75C14.9974 15.6133 12.5599 16.9955 10.7531 16.9955H6.75C6.05964 16.9955 5.5 16.4358 5.5 15.7455V4.25ZM8 11V14.4955H10.7531C11.5641 14.4955 12.4974 13.8768 12.4974 12.75C12.4974 11.6212 11.5598 11 10.7531 11H8ZM8 8.5H10.2478C11.1296 8.5 11.75 7.77853 11.75 7C11.75 6.22003 11.1295 5.5 10.2512 5.5H8V8.5Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M5 4.5C5 3.67157 5.67157 3 6.5 3H10.38C12.7442 3 14.5 4.93367 14.5 7.12C14.5 7.93875 14.2533 8.72553 13.8193 9.38869C14.6623 10.138 15.2474 11.2377 15.2474 12.63C15.2474 15.4046 12.9287 17 10.88 17H6.5C5.67157 17 5 16.3284 5 15.5V4.5ZM8 6V8.25H10.3795C11.0054 8.25 11.5 7.73416 11.5 7.12C11.5 6.51403 11.0119 6 10.38 6H8ZM8 11.25V14H10.88C11.5713 14 12.2474 13.4635 12.2474 12.63C12.2474 11.7902 11.5629 11.25 10.88 11.25H8Z"
      />
    </svg>
  ),
  displayName: 'BoldIcon',
});
