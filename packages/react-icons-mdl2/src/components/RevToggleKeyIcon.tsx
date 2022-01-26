import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RevToggleKeyIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1152 512q155 0 294 58t249 167q109 109 167 248t58 295q0 106-27 204t-78 183-120 156-155 120-184 77-204 28H256v-128h896q88 0 170-23t153-64 129-100 100-130 65-153 23-170q0-88-23-170t-64-153-100-129-130-100-153-65-170-23H331l426 427-74 74-566-565L683 11l74 74-426 427h821z" />
    </svg>
  ),
  displayName: 'RevToggleKeyIcon',
});

export default RevToggleKeyIcon;
