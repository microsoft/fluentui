import * as React from 'react';
import cx from 'classnames';
import createSvgIcon from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

const FocusModeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 16 16" className={classes.svg}>
      <g>
        <path
          className={cx(iconClassNames.outline, classes.outlinePart)}
          d="M1,16c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1h14c0.6,0,1,0.4,1,1v14c0,0.6-0.4,1-1,1c0,0,0,0,0,0L1,16z
			 M0.9,1.2v13.6c0,0.2,0.1,0.3,0.3,0.3h13.6c0.2,0,0.3-0.1,0.3-0.3V1.2c0-0.2-0.1-0.3-0.3-0.3H1.2C1,0.9,0.9,1,0.9,1.2z M9.7,12.4
			v-0.9h3.7v0.9H9.7z M4.4,12.2c-1-0.4-1.7-1.5-1.7-2.6h2.8V6.8C7,6.8,8.3,8,8.3,9.6c0,1.6-1.3,2.8-2.8,2.8
			C5.1,12.4,4.7,12.3,4.4,12.2L4.4,12.2z M9.7,10V9.1h3.7V10H9.7z M9.7,7.6V6.8h3.7v0.9H9.7z M3,4.5v-1h10v1H3z"
        />
      </g>
    </svg>
  ),
  displayName: 'FocusModeIcon',
});

export default FocusModeIcon;
