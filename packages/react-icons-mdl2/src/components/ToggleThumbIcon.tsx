import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ToggleThumbIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1031 0q143 0 274 36t244 103 205 161 157 208 101 245 36 273q0 140-36 270t-103 243-159 208-206 160-243 104-270 37q-140 0-271-36t-245-104-209-160-163-207-105-244-38-271q0-143 37-274t104-246 161-207 208-159T756 37t275-37z" />
    </svg>
  ),
  displayName: 'ToggleThumbIcon',
});

export default ToggleThumbIcon;
