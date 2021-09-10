import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PowerButtonIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1088 1024H960V0h128v1024zm212-724q138 44 252 128t196 197 127 248 45 279q0 124-32 238t-90 214-140 181-181 140-214 91-239 32q-124 0-238-32t-214-90-181-140-140-181-91-214-32-239q0-144 45-279t126-248 196-197 253-128l40 121q-119 39-217 111T403 700 295 911t-39 241q0 106 27 204t78 183 120 156 155 120 184 77 204 28q106 0 204-27t183-78 156-120 120-155 77-184 28-204q0-125-38-240t-109-212-168-168-217-111l40-121z" />
    </svg>
  ),
  displayName: 'PowerButtonIcon',
});

export default PowerButtonIcon;
