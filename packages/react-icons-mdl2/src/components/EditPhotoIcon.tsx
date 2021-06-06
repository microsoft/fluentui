import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EditPhotoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 576q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19q-26 0-45-19t-19-45zM128 1664h732l-32 128H0V256h2048v580q-28-22-60-37t-68-23V384H128v677l448-447 384 384 256-256 261 260-91 91-170-171-166 166 171 170-91 91-554-555-448 449v421zm1792-178l128-128v434h-434l128-128h178v-178zm128-392q0 39-15 76t-43 65l-717 717-377 94 94-376 717-717q28-28 65-41t76-13q42 0 78 14t64 41 42 61 16 79zm-149 51q21-21 21-51 0-32-20-50t-52-19q-14 0-27 4t-23 14l-692 692-34 135 135-34 692-691z" />
    </svg>
  ),
  displayName: 'EditPhotoIcon',
});

export default EditPhotoIcon;
