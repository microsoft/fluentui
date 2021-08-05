import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EditMailIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1707 953q28-28 65-41t76-13q42 0 78 14t62 41 42 62 16 78q0 39-15 76t-43 65l-715 717-377 94 94-377 717-716zm192 192q21-21 21-51 0-32-20-50t-52-19q-14 0-27 4t-23 14l-692 692-34 135 135-34 692-691zm149-761v450q-29-21-61-34t-67-22V648l-896 447-896-447v888h814l-128 128H0V384h2048zM1024 953l881-441H143l881 441z" />
    </svg>
  ),
  displayName: 'EditMailIcon',
});

export default EditMailIcon;
