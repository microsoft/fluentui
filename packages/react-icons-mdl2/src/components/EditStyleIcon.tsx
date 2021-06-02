import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EditStyleIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1055 896H609l-85 256H384L768 0h128l330 988-106 105-65-197zm-43-128L832 228 652 768h360zm581 131q42 0 78 14t63 41 42 61 16 79q0 39-15 76t-43 65l-717 717-377 94 94-377 717-716q28-28 65-41t77-13zm50 246q21-21 21-51 0-32-20-50t-52-19q-14 0-27 4t-23 14l-692 692-34 135 135-34 692-691z" />
    </svg>
  ),
  displayName: 'EditStyleIcon',
});

export default EditStyleIcon;
