import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AddNotesIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 256h2048v128H0V256zm0 640V768h2048v128H0zm0 512v-128h1280v128H0zm0 512v-128h1280v128H0zm1790-640v256h256v128h-256v256h-128v-256h-256v-128h256v-256h128z" />
    </svg>
  ),
  displayName: 'AddNotesIcon',
});

export default AddNotesIcon;
