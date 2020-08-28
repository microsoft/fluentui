import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const FontColorIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg viewBox="8 8 16 16" role="presentation" focusable="false" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M20.5 23h-9a.5.5 0 1 0 0 1h9a.5.5 0 1 0 0-1zm-8.664-2.028a.499.499 0 0 0 .636-.308L13.747 17h4.506l1.275 3.664a.5.5 0 1 0 .944-.328l-4-11.5a.5.5 0 0 0-.944 0l-4 11.5a.5.5 0 0 0 .308.636zM16 10.522L17.905 16h-3.81L16 10.522z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M20.5 23h-9a.5.5 0 1 0 0 1h9a.5.5 0 1 0 0-1zm-8.829-1.556a.999.999 0 0 0 1.274-.615l1.157-3.329h3.796l1.157 3.329a1.001 1.001 0 0 0 1.89-.658l-4-11.5a1 1 0 0 0-1.89 0l-4 11.5a1 1 0 0 0 .616 1.273zm4.329-9.4l1.202 3.456h-2.404L16 12.044z"
      />
    </svg>
  ),
  displayName: 'FontColorIcon',
});
