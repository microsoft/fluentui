import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const CompanionIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg className={classes.svg} viewBox="8 8 16 16" role="presentation" focusable="false">
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M14,21H11.5a.5.5,0,0,0,0,1H14Zm0-2H9.65A.64.64,0,0,1,9,18.35v-6.7A.64.64,0,0,1,9.65,11H14V10H9.65A1.65,1.65,0,0,0,8,11.65v6.7A1.65,1.65,0,0,0,9.65,20H13.9Zm7.6-4.5a2.73,2.73,0,0,1-.5-.05V19H16V11.5a.51.51,0,0,1,.5-.5h1.05a2.52,2.52,0,0,1,0-1H16.5A1.5,1.5,0,0,0,15,11.5v9A1.5,1.5,0,0,0,16.5,22h4A1.5,1.5,0,0,0,22,20.5V14.45A2.73,2.73,0,0,1,21.5,14.5ZM19,21H18a.5.5,0,0,1,0-1h1a.5.5,0,0,1,0,1Zm3-11V8H21v2H19v1h2v2h1V11h2V10Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M14,21H11.5a.5.5,0,0,0,0,1H14Zm0-11H9.65A1.65,1.65,0,0,0,8,11.65v6.7A1.65,1.65,0,0,0,9.65,20H13.9Zm7.55,4.5a2.73,2.73,0,0,1-.5-.05V19H16V11.5a.51.51,0,0,1,.5-.5h1.05a2.52,2.52,0,0,1,0-1H16.5A1.5,1.5,0,0,0,15,11.5v9A1.5,1.5,0,0,0,16.5,22h4A1.5,1.5,0,0,0,22,20.5V14.45A2.73,2.73,0,0,1,21.5,14.5ZM19,21H18a.5.5,0,0,1,0-1h1a.5.5,0,0,1,0,1Zm3-11V8H21v2H19v1h2v2h1V11h2V10Z"
      />
    </svg>
  ),
  displayName: 'CompanionIcon',
});
