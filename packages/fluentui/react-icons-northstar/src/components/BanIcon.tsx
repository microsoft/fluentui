import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const BanIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM17 10C17 13.866 13.866 17 10 17C8.24696 17 6.64442 16.3556 5.41636 15.2907L15.2907 5.41636C16.3556 6.64442 17 8.24696 17 10ZM4.70925 14.5836L14.5836 4.70925C13.3556 3.6444 11.753 3 10 3C6.13401 3 3 6.13401 3 10C3 11.753 3.6444 13.3556 4.70925 14.5836Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172
        5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM16.5 10C16.5 13.5899 13.5899 16.5 10 16.5C8.47531 16.5 7.07323 15.975
        5.96465 15.096L15.096 5.96465C15.975 7.07323 16.5 8.47531 16.5 10ZM4.90399 14.0353L14.0353 4.90399C12.9268 4.02496
        11.5247 3.5 10 3.5C6.41015 3.5 3.5 6.41015 3.5 10C3.5 11.5247 4.02496 12.9268 4.90399 14.0353Z"
      />
    </svg>
  ),
  displayName: 'BanIcon',
});
