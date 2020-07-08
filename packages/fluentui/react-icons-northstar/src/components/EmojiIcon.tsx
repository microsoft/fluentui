import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const EmojiIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <g className={cx(iconClassNames.outline, classes.outlinePart)}>
          <path d="M16 24c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm0-15c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 11.5c-1.4 0-2.8-.5-3.9-1.6l.7-.7c1.8 1.8 4.6 1.8 6.4 0l.7.7c-1 1-2.5 1.6-3.9 1.6z" />
          <circle cx="13" cy="15" r="1" />
          <circle cx="19" cy="15" r="1" />
        </g>
        <path
          className={cx(iconClassNames.filled, classes.filledPart)}
          d="M16,8c-4.4,0-8,3.6-8,8c0,4.4,3.6,8,8,8c4.4,0,8-3.6,8-8C24,11.6,20.4,8,16,8z M13,14c0.6,0,1,0.4,1,1c0,0.6-0.4,1-1,1
            c-0.6,0-1-0.4-1-1C12,14.4,12.4,14,13,14z M16,20.5c-1.4,0-2.8-0.5-3.9-1.6l0.7-0.7c1.8,1.8,4.6,1.8,6.4,0l0.7,0.7
            C18.9,19.9,17.4,20.5,16,20.5z M19,16c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1c0.6,0,1,0.4,1,1C20,15.6,19.6,16,19,16z"
        />
      </g>
    </svg>
  ),
  displayName: 'EmojiIcon',
});
