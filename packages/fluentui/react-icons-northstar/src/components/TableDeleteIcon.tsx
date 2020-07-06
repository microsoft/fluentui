import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const TableDeleteIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg
      role="presentation"
      focusable="false"
      viewBox="8 8 16 16"
      className={classes.svg}
      aria-labelledby="icons_delete_table_column_row"
    >
      <g>
        <g className={cx(iconClassNames.outline, classes.outlinePart)}>
          <path d="M21 9.5c0-.827-.673-1.5-1.5-1.5h-10C8.673 8 8 8.673 8 9.5v10c0 .827.673 1.5 1.5 1.5H17v-4h4V9.5zM19.5 9a.5.5 0 0 1 .5.5V12h-3V9h2.5zM16 12h-3V9h3v3zM9.5 9H12v3H9V9.5a.5.5 0 0 1 .5-.5zM9 13h3v3H9v-3zm0 6.5V17h3v3H9.5a.5.5 0 0 1-.5-.5zm7 .5h-3v-3h3v3zm-3-4v-3h3v3h-3zm4 0v-3h3v3h-3zM22.207 21.5l1.414-1.414-.707-.707-1.414 1.414-1.414-1.414-.707.707 1.414 1.414-1.414 1.414.707.707 1.414-1.414 1.414 1.414.707-.707z" />
        </g>
        <g className={cx(iconClassNames.filled, classes.filledPart)}>
          <path d="M22.207 21.5l1.414-1.414-.707-.707-1.414 1.414-1.414-1.414-.707.707 1.414 1.414-1.414 1.414.707.707 1.414-1.414 1.414 1.414.707-.707zM13 13h3v3h-3zM8 13h4v3H8zM17 12h4V9.5c0-.827-.673-1.5-1.5-1.5H17v4zM13 17h3v4h-3zM12 12V8H9.5C8.673 8 8 8.673 8 9.5V12h4zM12 17H8v2.5c0 .827.673 1.5 1.5 1.5H12v-4zM17 13h4v3h-4zM13 8h3v4h-3z" />
        </g>
      </g>
    </svg>
  ),
  displayName: 'TableDeleteIcon',
});
