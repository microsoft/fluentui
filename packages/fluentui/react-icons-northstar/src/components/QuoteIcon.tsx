import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const QuoteIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <g className={cx(iconClassNames.filled, classes.filledPart)}>
          <path d="M12 11.5c-1.378 0-2.5 1.122-2.5 2.5a2.503 2.503 0 0 0 2.837 2.476c-.222 1.263-.716 2.288-1.613 3.393a1.004 1.004 0 0 0 .146 1.408 1.003 1.003 0 0 0 1.406-.146c2.052-2.53 2.224-4.714 2.224-6.735 0-2-1.256-2.896-2.5-2.896zM20 11.5c-1.379 0-2.5 1.122-2.5 2.5a2.503 2.503 0 0 0 2.837 2.476c-.223 1.264-.717 2.289-1.614 3.394a1.002 1.002 0 0 0 .777 1.63c.3 0 .583-.134.777-.37 2.051-2.528 2.223-4.713 2.223-6.734 0-2-1.256-2.896-2.5-2.896z" />
        </g>
        <g className={cx(iconClassNames.outline, classes.outlinePart)}>
          <path d="M12 12a2 2 0 1 0 0 4c.34 0 .655-.093.935-.242-.134 1.494-.55 2.857-1.823 4.427a.5.5 0 0 0 .776.63c1.957-2.41 2.112-4.503 2.112-6.42C14 12.793 13.105 12 12 12zM20 12a2 2 0 1 0 0 4c.34 0 .655-.093.935-.242-.134 1.494-.55 2.857-1.823 4.427a.5.5 0 0 0 .776.63c1.957-2.41 2.112-4.503 2.112-6.42C22 12.793 21.105 12 20 12z" />
        </g>
      </g>
    </svg>
  ),
  displayName: 'QuoteIcon',
});
