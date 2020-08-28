import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const TeamCreateIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg className={classes.svg} viewBox="8 8 16 16" role="presentation" focusable="false">
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M10,11c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S11.1,11,10,11z M10,14c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S10.6,14,10,14zM16,14c1.1,0,2-0.9,2-2s-0.9-2-2-2s-2,0.9-2,2S14.9,14,16,14z M16,11c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S15.4,11,16,11zM13,20c0,1.3,1.2,2,3,2c1.9,0,3-0.7,3-2v-5h-6V20z M14,16h4v4c0,1-1.7,1.1-2,1.1S14,21,14,20V16zM11.5,17c0.3,0,0.5-0.2,0.5-0.5c0-0.3-0.2-0.5-0.5-0.5H8v3c0,1.3,1.1,2,3,2h0.5c0.3,0,0.5-0.2,0.5-0.5
                c0-0.3-0.2-0.5-0.5-0.5H11C10.7,20,9,20,9,19v-2H11.5zM23.5,10H22V8.5C22,8.2,21.8,8,21.5,8S21,8.2,21,8.5V10h-1.5c-0.3,0-0.5,0.2-0.5,0.5s0.2,0.5,0.5,0.5H21v1.5
                c0,0.3,0.2,0.5,0.5,0.5s0.5-0.2,0.5-0.5V11h1.5c0.3,0,0.5-0.2,0.5-0.5S23.8,10,23.5,10z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M10,11c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S11.1,11,10,11z
                M16,14c1.1,0,2-0.9,2-2s-0.9-2-2-2s-2,0.9-2,2S14.9,14,16,14z
                M11.5,16H8v3c0,1.3,1.1,2,3,2h0.5c0.3,0,0.5-0.2,0.5-0.5v-4C12,16.2,11.8,16,11.5,16z
                M13,20c0,1.3,1.2,2,3,2c1.9,0,3-0.7,3-2v-5h-6V20z
                M23.5,10H22V8.5C22,8.2,21.8,8,21.5,8S21,8.2,21,8.5V10h-1.5c-0.3,0-0.5,0.2-0.5,0.5s0.2,0.5,0.5,0.5H21v1.5
                c0,0.3,0.2,0.5,0.5,0.5s0.5-0.2,0.5-0.5V11h1.5c0.3,0,0.5-0.2,0.5-0.5S23.8,10,23.5,10z"
      />
    </svg>
  ),
  displayName: 'TeamCreateIcon',
});
