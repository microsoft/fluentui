import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const ArchiveIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M16.5 2C17.3284 2 18 2.67157 18 3.5V5.5C18 6.15285 17.5829 6.70828 17.0007 6.9144L17 14.5C17 16.433 15.433 18 13.5 18H6.5C4.567 18 3 16.433 3 14.5L3.00029 6.91475C2.41754 6.70891 2 6.15322 2 5.5V3.5C2 2.67157 2.67157 2 3.5 2H16.5ZM16 7H4V14.5C4 15.8807 5.11929 17 6.5 17H13.5C14.8807 17 16 15.8807 16 14.5V7ZM8.5 9H11.5C11.7761 9 12 9.22386 12 9.5C12 9.74546 11.8231 9.94961 11.5899 9.99194L11.5 10H8.5C8.22386 10 8 9.77614 8 9.5C8 9.25454 8.17688 9.05039 8.41012 9.00806L8.5 9H11.5H8.5ZM16.5 3H3.5C3.22386 3 3 3.22386 3 3.5V5.5C3 5.77614 3.22386 6 3.5 6H16.5C16.7761 6 17 5.77614 17 5.5V3.5C17 3.22386 16.7761 3 16.5 3Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M17 7V15C17 16.6569 15.6569 18 14 18H6C4.34315 18 3 16.6569 3 15V7H17ZM11.5 9H8.5C8.22386 9 8 9.22386 8 9.5C8 9.77614 8.22386 10 8.5 10H11.5C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM17 2C17.5523 2 18 2.44772 18 3V5C18 5.55228 17.5523 6 17 6H3C2.44772 6 2 5.55228 2 5V3C2 2.44772 2.44772 2 3 2H17Z"
      />
    </svg>
  ),
  displayName: 'ArchiveIcon',
});
