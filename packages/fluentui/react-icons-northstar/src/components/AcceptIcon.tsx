import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const AcceptIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M3.37371 10.1678C3.19025 9.96143 2.87421 9.94284 2.66782 10.1263C2.46143 10.3098 2.44284 10.6258 2.6263 10.8322L6.6263 15.3322C6.81743 15.5472 7.15013 15.557 7.35356 15.3536L17.8536 4.85355C18.0488 4.65829 18.0488 4.34171 17.8536 4.14645C17.6583 3.95118 17.3417 3.95118 17.1465 4.14645L7.02141 14.2715L3.37371 10.1678Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M7.03212 13.9072L3.56056 10.0017C3.28538 9.69214 2.81132 9.66425 2.50174 9.93944C2.19215 10.2146 2.16426 10.6887 2.43945 10.9983L6.43945 15.4983C6.72614 15.8208 7.2252 15.8355 7.53034 15.5303L18.0303 5.03033C18.3232 4.73744 18.3232 4.26256 18.0303 3.96967C17.7374 3.67678 17.2626 3.67678 16.9697 3.96967L7.03212 13.9072Z"
      />
    </svg>
  ),
  displayName: 'AcceptIcon',
});
