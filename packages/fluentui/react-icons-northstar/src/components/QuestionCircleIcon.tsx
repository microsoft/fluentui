import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const QuestionCircleIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M16 8c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 15c-3.9 0-7-3.2-7-7s3.2-7 7-7 7 3.2 7 7-3.1 7-7 7zm1.7-11.4c-.2-.2-.5-.3-.8-.4-.3-.1-.6-.1-1-.1-.7 0-1.4.2-2.1.6-.2.1-.3.4-.1.6.1.2.4.3.6.1.5-.3 1.1-.5 1.6-.5.3 0 .5 0 .7.1l.6.3c.1.1.3.3.3.4.1.2.1.4.1.6 0 .2 0 .4-.1.6-.1.2-.2.4-.3.5-.1.2-.3.3-.5.5s-.4.3-.5.5c-.2.2-.3.4-.4.6-.1.2-.2.5-.2.8v.7c0 .2.2.4.4.4s.4-.2.4-.4v-.7c0-.1 0-.3.1-.4.1-.1.2-.3.3-.4.1-.2.3-.3.5-.5l.6-.6c.2-.2.3-.5.4-.7.1-.3.2-.6.2-1s-.1-.7-.2-1l-.6-.6z"
      />
      <circle className={cx(iconClassNames.outline, classes.outlinePart)} cx="16" cy="20.3" r=".7" />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M16 8c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 13c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm2.5-6.4c-.1.3-.3.5-.5.8-.2.2-.4.4-.5.6-.2.1-.3.3-.4.4-.1.1-.2.2-.2.3v.7c0 .4-.4.8-.8.8s-.8-.4-.8-.8v-.6c0-.3.1-.7.3-.9.1-.2.3-.4.5-.6l.5-.5.4-.4c.1-.1.2-.3.2-.4 0-.1.1-.2.1-.4s0-.3-.1-.4c-.1-.1-.1-.2-.2-.3-.1-.1-.2-.1-.4-.2-.2 0-.4-.1-.6-.1-.4 0-.9.1-1.3.4-.4.2-.9.1-1.1-.3-.2-.4-.1-.9.3-1.1.7-.4 1.4-.6 2.2-.6.4 0 .7 0 1 .1.3.1.6.3.9.5.3.2.5.5.7.8.2.3.2.7.2 1.1-.2.4-.3.8-.4 1.1z"
      />
    </svg>
  ),
  displayName: 'QuestionCircleIcon',
});
