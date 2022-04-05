import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const MessageSeenIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <path d="M3.25909 11.6021C3.94254 8.32689 6.79437 6 10 6C13.2057 6 16.0574 8.32688 16.7409 11.6021C16.7974 11.8725 17.0622 12.0459 17.3325 11.9895C17.6029 11.933 17.7763 11.6682 17.7199 11.3979C16.9425 7.67312 13.6934 5 10 5C6.3066 5 3.05742 7.67311 2.28017 11.3979C2.22377 11.6682 2.39718 11.933 2.6675 11.9895C2.93782 12.0459 3.20268 11.8725 3.25909 11.6021Z" />
      <path d="M9.98953 8C11.9225 8 13.4895 9.567 13.4895 11.5C13.4895 13.433 11.9225 15 9.98953 15C8.05653 15 6.48953 13.433 6.48953 11.5C6.48953 9.567 8.05653 8 9.98953 8Z" />
    </svg>
  ),
  displayName: 'MessageSeenIcon',
});
