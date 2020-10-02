import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const ExclamationCircleIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" viewBox="0 0 20 20" className={classes.svg}>
      <path d="M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2ZM10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3ZM10 12.5C10.4142 12.5 10.75 12.8358 10.75 13.25C10.75 13.6642 10.4142 14 10 14C9.58579 14 9.25 13.6642 9.25 13.25C9.25 12.8358 9.58579 12.5 10 12.5ZM10 6C10.2455 6 10.4496 6.17688 10.4919 6.41012L10.5 6.5V11C10.5 11.2761 10.2761 11.5 10 11.5C9.75454 11.5 9.55039 11.3231 9.50806 11.0899L9.5 11V6.5C9.5 6.22386 9.72386 6 10 6Z" />
    </svg>
  ),
  displayName: 'ExclamationCircleIcon',
});
