import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ResetIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 1216q0 115-30 221t-84 198-130 169-168 130-199 84-221 30q-115 0-221-30t-198-84-169-130-130-168-84-199-30-221v-64h128v64q0 97 25 187t71 168 110 142 143 111 168 71 187 25q97 0 187-25t168-71 142-110 111-143 71-168 25-187q0-97-25-187t-71-168-110-142-143-111-168-71-187-25H250l291 291-90 90L6 448 451 3l90 90-291 291h838q115 0 221 30t198 84 169 130 130 168 84 199 30 221z" />
    </svg>
  ),
  displayName: 'ResetIcon',
});

export default ResetIcon;
