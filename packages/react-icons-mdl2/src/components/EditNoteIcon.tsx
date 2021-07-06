import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EditNoteIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M384 1920h412l-32 128H256V128h128V0h128v128h256V0h128v128h256V0h128v128h256V0h128v128h128v648q-34 5-66 17t-62 31V256H384v1664zM1848 896q42 0 78 15t64 41 42 63 16 79q0 39-15 76t-43 65l-717 717-377 94 94-377 717-716q29-29 65-43t76-14zm51 249q21-21 21-51 0-31-20-50t-52-20q-14 0-27 4t-23 15l-692 692-34 135 135-34 692-691z" />
    </svg>
  ),
  displayName: 'EditNoteIcon',
});

export default EditNoteIcon;
