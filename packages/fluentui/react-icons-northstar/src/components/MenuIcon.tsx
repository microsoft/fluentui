import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const MenuIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M2 5.5C2 5.22386 2.22386 5 2.5 5H17.5C17.7761 5 18 5.22386 18 5.5C18 5.77614 17.7761 6 17.5 6H2.5C2.22386 6 2 5.77614 2 5.5Z" />
        <path d="M2 10.5C2 10.2239 2.22386 10 2.5 10H17.5C17.7761 10 18 10.2239 18 10.5C18 10.7761 17.7761 11 17.5 11H2.5C2.22386 11 2 10.7761 2 10.5Z" />
        <path d="M2.5 15C2.22386 15 2 15.2239 2 15.5C2 15.7761 2.22386 16 2.5 16H17.5C17.7761 16 18 15.7761 18 15.5C18 15.2239 17.7761 15 17.5 15H2.5Z" />
      </g>
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M2 5.25C2 4.83579 2.33579 4.5 2.75 4.5H17.25C17.6642 4.5 18 4.83579 18 5.25C18 5.66421 17.6642 6 17.25 6H2.75C2.33579 6 2 5.66421 2 5.25Z" />
        <path d="M2 10.25C2 9.83579 2.33579 9.5 2.75 9.5H17.25C17.6642 9.5 18 9.83579 18 10.25C18 10.6642 17.6642 11 17.25 11H2.75C2.33579 11 2 10.6642 2 10.25Z" />
        <path d="M2.75 14.5C2.33579 14.5 2 14.8358 2 15.25C2 15.6642 2.33579 16 2.75 16H17.25C17.6642 16 18 15.6642 18 15.25C18 14.8358 17.6642 14.5 17.25 14.5H2.75Z" />
      </g>
    </svg>
  ),
  displayName: 'MenuIcon',
});
