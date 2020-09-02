import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const TabsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M21.5 10a1.51 1.51 0 011.5 1.5v10a1.51 1.51 0 01-1.5 1.5h-12A1.51 1.51 0 018 21.5v-9A1.5 1.5 0 019.5 11h7.59a1.5 1.5 0 011.41-1zm-12 2a.51.51 0 00-.5.5V14h2v-2zm9-1a.51.51 0 00-.5.5V15H9v6.5a.51.51 0 00.5.5h12a.51.51 0 00.5-.5v-10a.51.51 0 00-.5-.5zM12 12v2h2v-2zm3 0v2h2v-2z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M21.5 10a1.51 1.51 0 011.5 1.5v10a1.51 1.51 0 01-1.5 1.5h-12A1.51 1.51 0 018 21.5v-9A1.5 1.5 0 019.5 11h7.59a1.5 1.5 0 011.41-1zm-12 2a.51.51 0 00-.5.5V14h2v-2zm2.5 0v2h2v-2zm3 0v2h2v-2z"
      />
    </svg>
  ),
  displayName: 'TabsIcon',
});
