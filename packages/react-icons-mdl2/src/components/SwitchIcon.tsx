import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SwitchIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1408v128H250l163 163-90 90L6 1472l317-317 90 90-163 163h1798zm-413-605l163-163H0V512h1798l-163-163 90-90 317 317-317 317-90-90z" />
    </svg>
  ),
  displayName: 'SwitchIcon',
});

export default SwitchIcon;
