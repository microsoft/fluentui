import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const ChevronEndMediumIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svgFlippingInRtl}>
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M19.49,16a.91.91,0,0,1-.29.7l-5,5a1,1,0,0,1-.71.3,1,1,0,0,1-1-1,1,1,0,0,1,.29-.7L17.08,16l-4.3-4.29a1,1,0,0,1-.29-.71,1,1,0,0,1,1.71-.71l5,5A1,1,0,0,1,19.49,16Z"
      />
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M13.49,10.5a.48.48,0,0,1,.35.14l5,5A.49.49,0,0,1,19,16a.49.49,0,0,1-.15.36l-5,5a.47.47,0,0,1-.35.15A.52.52,0,0,1,13,21a.49.49,0,0,1,.15-.35L17.79,16l-4.65-4.65A.49.49,0,0,1,13,11,.5.5,0,0,1,13.49,10.5Z"
      />
    </svg>
  ),
  displayName: 'ChevronEndMediumIcon',
});
