import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const VideoCameraEmphasisIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path
          className={cx(iconClassNames.outline, classes.outlinePart)}
          d="M23.7 12.041a.5.5 0 0 0-.542.1l-2.532 2.417a1.989 1.989 0 0 0 0 2.89l2.532 2.417A.5.5 0 0 0 23.5 20a.491.491 0 0 0 .2-.041.5.5 0 0 0 .3-.459v-7a.5.5 0 0 0-.3-.459zm-.7 6.291l-1.687-1.61a.986.986 0 0 1 0-1.442L23 13.668zm-4 .168v-5a1.5 1.5 0 0 0-1.5-1.5H9.756a1.508 1.508 0 0 0-1.471 1.188 14.01 14.01 0 0 0 0 5.625A1.508 1.508 0 0 0 9.756 20H17.5a1.5 1.5 0 0 0 1.5-1.5zm-9.736.106a13.007 13.007 0 0 1 0-5.211.5.5 0 0 1 .492-.395H17.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5H9.756a.5.5 0 0 1-.492-.394zM19.482 22.066a7.076 7.076 0 0 1-6.965 0 .5.5 0 0 0-.5.867 7.962 7.962 0 0 0 7.961 0 .5.5 0 0 0-.5-.867zM12.518 9.934a7.076 7.076 0 0 1 6.965 0 .5.5 0 0 0 .5-.867 7.962 7.962 0 0 0-7.961 0 .5.5 0 0 0 .5.867z"
        />
        <path
          className={cx(iconClassNames.filled, classes.filledPart)}
          d="M19.482 22.066a7.076 7.076 0 0 1-6.965 0 .5.5 0 0 0-.5.867 7.962 7.962 0 0 0 7.961 0 .5.5 0 0 0-.5-.867zM12.518 9.934a7.076 7.076 0 0 1 6.965 0 .5.5 0 0 0 .5-.867 7.962 7.962 0 0 0-7.961 0 .5.5 0 0 0 .5.867zM23.7 12.041a.5.5 0 0 0-.542.1l-2.532 2.417a1.989 1.989 0 0 0 0 2.89l2.532 2.417A.5.5 0 0 0 23.5 20a.491.491 0 0 0 .2-.041.5.5 0 0 0 .3-.459v-7a.5.5 0 0 0-.3-.459zM19 18.5v-5a1.5 1.5 0 0 0-1.5-1.5H9.756a1.508 1.508 0 0 0-1.471 1.188 14.01 14.01 0 0 0 0 5.625A1.508 1.508 0 0 0 9.756 20H17.5a1.5 1.5 0 0 0 1.5-1.5z"
        />
      </g>
    </svg>
  ),
  displayName: 'VideoCameraEmphasisIcon',
});
