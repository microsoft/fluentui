import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CodeEditIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M219 1024l205 205-37 145-350-350 430-429 90 90-338 339zm1792 0l-430 429-90-90 338-339-149-149q26-26 47-48t38-48l246 245zm-547-640q42 0 78 15t64 42 42 63 16 78q0 39-15 76t-43 65l-717 719-377 94 94-377 717-718q28-28 65-42t76-15zm51 249q21-21 21-51 0-31-20-50t-52-20q-14 0-27 4t-23 15l-692 694-34 135 135-34 692-693z" />
    </svg>
  ),
  displayName: 'CodeEditIcon',
});

export default CodeEditIcon;
