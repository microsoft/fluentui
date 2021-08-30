import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const InsertSignatureLineIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 1532l128-128v644H128V0h1115l499 499q-35 11-60 23t-48 28-42 36-44 44l-10 10h-386V128H256v1792h1408v-388zM1280 512h293l-293-293v293zm568 128q42 0 78 15t64 42 42 63 16 78q0 39-15 76t-43 65l-717 719q-7 2-37 9t-71 18-89 22-86 22-66 16-28 7H384v-128h544l62-249 717-718q28-28 65-42t76-15zm51 249q21-21 21-51 0-31-20-50t-52-20q-14 0-27 4t-23 15l-692 694-34 135 135-34 692-693z" />
    </svg>
  ),
  displayName: 'InsertSignatureLineIcon',
});

export default InsertSignatureLineIcon;
