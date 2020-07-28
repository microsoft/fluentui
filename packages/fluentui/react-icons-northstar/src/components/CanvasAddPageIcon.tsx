import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const CanvasAddPageIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <g className={cx(iconClassNames.outline, classes.outlinePart)}>
          <path d="M11.5 23a.5.5 0 0 1-.5-.5V14h3.986V9.003c.005 0 .01-.003.014-.003h5.5a.5.5 0 0 1 .5.5V18h1V9.5c0-.827-.673-1.5-1.5-1.5H15c-.4 0-.777.156-1.083.463l-3.478 3.968A1.49 1.49 0 0 0 10 13.49V22.5c0 .827.673 1.5 1.5 1.5H17v-1h-5.5zm2.486-13.1V13H11.27l2.717-3.1z" />
          <path d="M23 21h-2v-2h-1v2h-2v1h2v2h1v-2h2z" />
        </g>
        <g className={cx(iconClassNames.filled, classes.filledPart)}>
          <path d="M23 21h-2v-2h-1v2h-2v1h2v2h1v-2h2z" />
          <path d="M16.5 21.5c0-2.206 1.794-4 4-4 .531 0 1.036.109 1.5.297V9.5c0-.827-.673-1.5-1.5-1.5H15l-.014.001V14H10v8.5c0 .827.673 1.5 1.5 1.5h5.903a3.96 3.96 0 0 1-.903-2.5z" />
          <path d="M13.986 13V8.405c-.022.021-.047.036-.069.058l-3.478 3.968a1.486 1.486 0 0 0-.35.569h3.897z" />
        </g>
      </g>
    </svg>
  ),
  displayName: 'CanvasAddPageIcon',
});
