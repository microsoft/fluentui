import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ProductReleaseIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M896 1537V936L256 616v880l544 273-31 127-641-320V472L960 57l832 415v270q-70 11-128 45V616l-640 320v473l-128 128zM754 302l584 334 247-124-625-313-206 103zm206 523l240-120-584-334-281 141 625 313zm888 71q42 0 78 15t64 41 42 63 16 79q0 39-15 76t-43 65l-717 717-377 94 94-377 717-716q29-29 65-43t76-14zm51 249q21-21 21-51 0-31-20-50t-52-20q-14 0-27 4t-23 15l-692 692-34 135 135-34 692-691z" />
    </svg>
  ),
  displayName: 'ProductReleaseIcon',
});

export default ProductReleaseIcon;
