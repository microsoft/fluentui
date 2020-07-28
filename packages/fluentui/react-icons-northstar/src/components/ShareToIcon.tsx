import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const ShareToIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg className={classes.svg} viewBox="8 8 16 16" role="presentation" focusable="false">
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M21.49,10A1.53,1.53,0,0,1,23,11.5v7a1.53,1.53,0,0,1-1.5,1.5H18v1c.22,0,.44,0,.66,0s.84.08.84.53a.5.5,0,0,1-.5.5H13a.51.51,0,0,1-.5-.5c0-.48.46-.53.84-.53q.33,0,.66,0V20c-.22,0-.44,0-.65,0s-.85-.1-.85-.53A.51.51,0,0,1,13,19h8.5a.5.5,0,0,0,.5-.5v-7a.5.5,0,0,0-.5-.5h-11a.51.51,0,0,0-.5.5V16a.5.5,0,0,1-.5.5A.51.51,0,0,1,9,16V11.5a1.54,1.54,0,0,1,1.5-1.5ZM15,20v1h2V20Zm.5-7a.5.5,0,0,1,.5.5V17a.5.5,0,0,1-.5.5A.51.51,0,0,1,15,17V14.71L9.84,19.85a.45.45,0,0,1-.35.15.5.5,0,0,1-.35-.85L14.28,14H12a.5.5,0,0,1,0-1Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M21.49,10A1.52,1.52,0,0,1,23,11.5v7a1.52,1.52,0,0,1-1.5,1.5H18v1c.22,0,.44,0,.66,0s.84.08.84.53a.5.5,0,0,1-.5.5H13a.51.51,0,0,1-.5-.5c0-.48.46-.53.84-.53q.33,0,.66,0V20c-.22,0-.44,0-.65,0s-.85-.1-.85-.53A.51.51,0,0,1,13,19h8.5a.5.5,0,0,0,.5-.5v-7a.5.5,0,0,0-.5-.5h-11a.51.51,0,0,0-.5.5V16a.5.5,0,0,1-.5.5A.51.51,0,0,1,9,16V11.5a1.52,1.52,0,0,1,1.5-1.5ZM15,20v1h2V20Zm.5-7.5a1,1,0,0,1,1,1V17a1,1,0,0,1-1,1c-1.17,0-1-1.28-1-2.09l-4.29,4.3a.94.94,0,0,1-.71.29,1,1,0,0,1-1-1,1,1,0,0,1,.29-.71l4.3-4.29h-.63c-.7,0-1.46-.14-1.46-1a1,1,0,0,1,1-1Z"
      />
    </svg>
  ),
  displayName: 'ShareToIcon',
});
