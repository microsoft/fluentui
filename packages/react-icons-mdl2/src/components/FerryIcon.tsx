import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FerryIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1768 1792h152v128h-216q-32 63-74 95t-94 33q-54 0-103-21t-88-63q-20-21-44-32t-53-12q-56 0-97 44-38 41-87 62t-104 22q-54 0-103-21t-88-63q-20-21-45-32t-52-12q-56 0-97 44-38 41-87 62t-104 22q-51 0-93-32t-75-96H0v-128h152L0 1487v-157l256-85V768h152l128-256h232V256h384v256h232l128 256h152v477l256 85v157l-152 305zM896 512h128V384H896v128zM552 768h816l-64-128H616l-64 128zm-168 434l576-192 576 192V896H384v306zm479 674q15 17 33 27v-737l-768 256v35l202 403q15 31 30 45t24 15q27 0 52-11t45-33q38-41 87-62t104-22q54 0 103 21t88 63zm929-419v-35l-768-256v737q18-10 33-27 38-41 87-62t104-22q54 0 103 21t88 63q41 44 97 44 9 0 24-14t30-46l202-403z" />
    </svg>
  ),
  displayName: 'FerryIcon',
});

export default FerryIcon;
