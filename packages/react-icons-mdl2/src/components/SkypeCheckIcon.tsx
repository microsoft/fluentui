import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SkypeCheckIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1570 437q42 0 78 15t64 43 42 63 16 79q0 40-15 77t-43 65l-794 795q-28 28-65 43t-77 16q-40 0-77-15t-65-44l-362-362q-28-28-43-65t-16-77q0-42 16-78t43-64 63-42 79-16q40 0 77 15t65 43l220 220 652-653q28-28 65-43t77-15z" />
    </svg>
  ),
  displayName: 'SkypeCheckIcon',
});

export default SkypeCheckIcon;
