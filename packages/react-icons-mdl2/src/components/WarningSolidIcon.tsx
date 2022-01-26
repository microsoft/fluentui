import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const WarningSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M960 0l960 1920H0L960 0zm64 1664v-128H896v128h128zm-128-256h128V640H896v768z" />
    </svg>
  ),
  displayName: 'WarningSolidIcon',
});

export default WarningSolidIcon;
