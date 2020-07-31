import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const TagIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M14.66 24a1.668 1.668 0 0 1-1.184-.49l-4.985-4.986a1.675 1.675 0 0 1 0-2.369l6.664-6.664A1.685 1.685 0 0 1 16.339 9h4.986A1.676 1.676 0 0 1 23 10.675v4.986a1.685 1.685 0 0 1-.491 1.184l-6.664 6.664A1.67 1.67 0 0 1 14.66 24zm1.679-14a.68.68 0 0 0-.477.2L9.2 16.862a.68.68 0 0 0 0 .955l4.983 4.983a.691.691 0 0 0 .955 0l6.662-6.662a.68.68 0 0 0 .2-.477v-4.986a.676.676 0 0 0-.675-.675z" />
        <circle cx="20" cy="12" r="1.25" />
      </g>
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M21.325 9H16.34a1.688 1.688 0 0 0-1.185.491l-6.664 6.664a1.675 1.675 0 0 0 0 2.369l4.985 4.986a1.7 1.7 0 0 0 2.368 0l6.666-6.666a1.67 1.67 0 0 0 .49-1.183v-4.986A1.676 1.676 0 0 0 21.325 9zm-.264 4.061a1.5 1.5 0 1 1 0-2.122 1.5 1.5 0 0 1 0 2.122z" />
      </g>
    </svg>
  ),
  displayName: 'TagIcon',
});
