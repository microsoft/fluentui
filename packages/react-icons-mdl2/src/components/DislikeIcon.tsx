import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DislikeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M960 256q178 0 345 69 72 29 144 44t151 15h448v896h-417q-65 0-122 24t-104 70l-622 621q-25 25-50 39t-61 14q-33 0-62-12t-51-35-34-51-13-62q0-81 18-154t53-146q20-43 34-87t19-93H192q-39 0-74-15t-61-41-42-61-15-75q0-32 10-61l256-768q20-59 70-95t112-36h512zm960 256h-320q-179 0-345-69-144-59-295-59H448q-20 0-37 12t-24 32q-5 14-18 54t-33 96-42 124-46 137-44 134-39 118-27 86-10 39q0 26 19 45t45 19h576q0 53-2 98t-10 89-22 86-37 91q-28 58-42 118t-15 126q0 14 9 23t23 9q6 0 10-4t9-9l623-624q32-32 68-56t78-41q80-34 171-34h289V512z" />
    </svg>
  ),
  displayName: 'DislikeIcon',
});

export default DislikeIcon;
