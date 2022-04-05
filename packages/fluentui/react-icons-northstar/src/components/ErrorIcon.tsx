import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const ErrorIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <path
        className={classes.redPath}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.68404 2.85216C9.25393 1.816 10.7428 1.81599 11.3127 2.85216L17.8714 14.7771C18.4212 15.7768 17.698 17 16.5571 17H3.43964C2.29873 17 1.57549 15.7768 2.12531 14.7771L8.68404 2.85216ZM9.99835 6.75C10.4126 6.75 10.7484 7.08579 10.7484 7.5V11.5C10.7484 11.9142 10.4126 12.25 9.99835 12.25C9.58414 12.25 9.24835 11.9142 9.24835 11.5V7.5C9.24835 7.08579 9.58414 6.75 9.99835 6.75ZM10.7484 13.75C10.7484 14.1642 10.4126 14.5 9.99835 14.5C9.58414 14.5 9.24835 14.1642 9.24835 13.75C9.24835 13.3358 9.58414 13 9.99835 13C10.4126 13 10.7484 13.3358 10.7484 13.75Z"
      />
    </svg>
  ),
  displayName: 'ErrorIcon',
});
