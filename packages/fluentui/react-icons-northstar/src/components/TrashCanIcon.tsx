import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const TrashCanIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <g className={cx(iconClassNames.outline, classes.outlinePart)}>
          <path d="M21 10h-3v-.7c0-.741-.86-1.3-2-1.3s-2 .559-2 1.3v.7h-3a.5.5 0 1 0 0 1h10a.5.5 0 1 0 0-1zm-6.003-.682C15.035 9.228 15.387 9 16 9s.965.228 1 .3v.7h-2.001l-.002-.682zM19.5 12h-7c-.827 0-1.5.673-1.5 1.5v8.552c0 .696.44 1.296 1.07 1.46 1.242.324 2.564.488 3.93.488s2.688-.164 3.93-.488c.63-.164 1.07-.764 1.07-1.46V13.5c0-.827-.673-1.5-1.5-1.5zm.5 10.052c0 .237-.136.444-.323.493-2.318.604-5.036.604-7.354 0-.187-.05-.323-.256-.323-.493V13.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v8.552z" />
          <path d="M14 15h1v6h-1zM17 15h1v6h-1z" />
        </g>
        <path
          className={cx(iconClassNames.filled, classes.filledPart)}
          d="M21 10h-3v-.7c0-.741-.86-1.3-2-1.3s-2 .559-2 1.3v.7h-3a.5.5 0 1 0 0 1h10a.5.5 0 1 0 0-1zm-1.5 2h-7c-.827 0-1.5.673-1.5 1.5v8.552c0 .696.44 1.296 1.07 1.46 1.242.324 2.564.488 3.93.488s2.688-.164 3.93-.488c.63-.164 1.07-.764 1.07-1.46V13.5c0-.827-.673-1.5-1.5-1.5zM15 21h-1v-6h1v6zm3 0h-1v-6h1v6z"
        />
      </g>
    </svg>
  ),
  displayName: 'TrashCanIcon',
});
