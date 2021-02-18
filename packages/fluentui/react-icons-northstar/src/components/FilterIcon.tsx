import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const FilterIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" className={classes.svg} viewBox="2 2 16 16">
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M7.5 13H12.5C12.7761 13 13 13.2239 13 13.5C13 13.7455 12.8231 13.9496 12.5899 13.9919L12.5 14H7.5C7.22386 14 7 13.7761 7 13.5C7 13.2545 7.17688 13.0504 7.41012 13.0081L7.5 13H12.5H7.5ZM5.5 9H14.5C14.7761 9 15 9.22386 15 9.5C15 9.74546 14.8231 9.94961 14.5899 9.99194L14.5 10H5.5C5.22386 10 5 9.77614 5 9.5C5 9.25454 5.17688 9.05039 5.41012 9.00806L5.5 9H14.5H5.5ZM3.5 5H16.5C16.7761 5 17 5.22386 17 5.5C17 5.74546 16.8231 5.94961 16.5899 5.99194L16.5 6H3.5C3.22386 6 3 5.77614 3 5.5C3 5.25454 3.17688 5.05039 3.41012 5.00806L3.5 5H16.5H3.5Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M12.25 13.5C12.6642 13.5 13 13.8358 13 14.25C13 14.6642 12.6642 15 12.25 15H7.75C7.33579 15 7 14.6642 7 14.25C7 13.8358 7.33579 13.5 7.75 13.5H12.25ZM14.25 9.25C14.6642 9.25 15 9.58579 15 10C15 10.4142 14.6642 10.75 14.25 10.75H5.75C5.33579 10.75 5 10.4142 5 10C5 9.58579 5.33579 9.25 5.75 9.25H14.25ZM16.25 5C16.6642 5 17 5.33579 17 5.75C17 6.16421 16.6642 6.5 16.25 6.5H3.75C3.33579 6.5 3 6.16421 3 5.75C3 5.33579 3.33579 5 3.75 5H16.25Z"
      />
    </svg>
  ),
  displayName: 'FilterIcon',
});
