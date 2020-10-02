import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const AddIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" viewBox="0 0 20 20" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M9.5 16.5C9.5 16.7761 9.72386 17 10 17C10.2761 17 10.5 16.7761 10.5 16.5V10.5H16.5C16.7761 10.5 17 10.2761 17 10C17 9.72386 16.7761 9.5 16.5 9.5H10.5V3.5C10.5 3.22386 10.2761 3 10 3C9.72386 3 9.5 3.22386 9.5 3.5V9.5H3.5C3.22386 9.5 3 9.72386 3 10C3 10.2761 3.22386 10.5 3.5 10.5H9.5V16.5Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M9.25 16.25C9.25 16.6642 9.58579 17 10 17C10.4142 17 10.75 16.6642 10.75 16.25V10.75H16.25C16.6642 10.75 17 10.4142 17 10C17 9.58579 16.6642 9.25 16.25 9.25H10.75V3.75C10.75 3.33579 10.4142 3 10 3C9.58579 3 9.25 3.33579 9.25 3.75V9.25H3.75C3.33579 9.25 3 9.58579 3 10C3 10.4142 3.33579 10.75 3.75 10.75H9.25V16.25Z"
      />
    </svg>
  ),
  displayName: 'AddIcon',
});
