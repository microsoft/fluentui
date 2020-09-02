import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const ImageUnavailableIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 32 32" className={classes.svg}>
      <path d="M29.794 3.62l1.913-1.913A1 1 0 0 0 30.293.293l-30 30a1 1 0 1 0 1.414 1.414L5.914 27.5H29a3.003 3.003 0 0 0 3-3v-18a2.995 2.995 0 0 0-2.206-2.88zm-6.933 6.933a1.998 1.998 0 1 1-2.39 2.39zM7.914 25.5l6.24-6.24 4.267 6.24zM30 24.5a1.001 1.001 0 0 1-1 1h-8.156l-5.251-7.679 3.36-3.36a3.986 3.986 0 1 0 5.426-5.426L27.914 5.5H29a1.001 1.001 0 0 1 1 1zM2.494 25.342A.986.986 0 0 1 2 24.5v-2.83l7.038-7.793a.99.99 0 0 1 .79-.29.975.975 0 0 1 .719.398l1.342 1.962 1.439-1.439-1.142-1.668a2.996 2.996 0 0 0-2.194-1.246 3.029 3.029 0 0 0-2.404.905L2 18.686V6.5a1.001 1.001 0 0 1 1-1h19.336l2-2H3a3.003 3.003 0 0 0-3 3v18a2.98 2.98 0 0 0 1.064 2.272z" />
    </svg>
  ),
  displayName: 'ImageUnavailableIcon',
});
