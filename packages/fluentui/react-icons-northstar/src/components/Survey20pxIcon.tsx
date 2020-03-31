import * as React from 'react';
import cx from 'classnames';
import createSvgIcon from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

// TODO: should we reconsider name
const Survey20pxIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg className={classes.svg} viewBox="8 8 16 16" role="presentation" focusable="false">
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M17,8.06l.05,0,1.6,1.49a.38.38,0,0,1,.08.48l0,.06-1.39,1.71a.4.4,0,0,1-.56.06.39.39,0,0,1-.1-.5l0-.06.77-.95H16a6.4,6.4,0,1,0,6.4,6.4.4.4,0,1,1,.8,0,7.2,7.2,0,1,1-7.41-7.2H17.5l-1-.91a.4.4,0,0,1-.07-.51l.05,0A.4.4,0,0,1,17,8.06Zm6,1.62a.4.4,0,0,1,.12.49l0,.07L16.72,19a.4.4,0,0,1-.56.08l-.06-.05-3.2-3.6a.41.41,0,0,1,0-.57.42.42,0,0,1,.52,0l.05,0,2.87,3.23,6.11-8.4A.41.41,0,0,1,23,9.68Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M17.07,8.06l.05,0,1.6,1.49a.38.38,0,0,1,.08.48l0,.06-1.39,1.71a.4.4,0,0,1-.56.06.39.39,0,0,1-.1-.5l0-.06.77-.95H16.05a6.4,6.4,0,1,0,6.4,6.4.4.4,0,1,1,.8,0,7.2,7.2,0,1,1-7.41-7.2h1.71l-1-.91a.4.4,0,0,1-.07-.51l0,0A.4.4,0,0,1,17.07,8.06Zm6.25,1.29a.81.81,0,0,1,.23,1l-.05.08-6.4,8.8a.8.8,0,0,1-1.18.13l-.07-.07-3.2-3.6a.8.8,0,0,1,1.13-1.13l.07.07,2.54,2.85,5.81-8A.8.8,0,0,1,23.32,9.35Z"
      />
    </svg>
  ),
  displayName: 'Survey20pxIcon',
});

export default Survey20pxIcon;
