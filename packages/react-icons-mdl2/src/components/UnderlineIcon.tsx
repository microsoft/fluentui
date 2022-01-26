import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const UnderlineIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1011 1792q-161 0-274-46t-184-133-105-209-33-275V128h192v988q0 109 21 201t71 159 131 106 201 38q115 0 193-36t127-101 69-154 21-195V128h192v975q0 158-34 285t-109 217-193 138-286 49zm-627 128h1280v128H384v-128z" />
    </svg>
  ),
  displayName: 'UnderlineIcon',
});

export default UnderlineIcon;
