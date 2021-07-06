import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MediaIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 670v898q0 51-22 92t-59 70-82 46-93 16q-47 0-93-16t-82-45-58-71-23-92q0-51 22-92t59-71 82-45 93-16q66 0 128 31V834l-640 160v702q0 51-22 92t-59 70-82 46-93 16q-47 0-93-16t-82-45-58-71-23-92q0-51 22-92t59-71 82-45 93-16q66 0 128 31V894l896-224zM1024 1792q20 0 42-6t42-18 31-30 13-42q0-24-12-42t-32-30-41-18-43-6q-20 0-42 6t-42 18-31 30-13 42q0 24 12 42t32 30 41 18 43 6zm768-128q20 0 42-6t42-18 31-30 13-42q0-24-12-42t-32-30-41-18-43-6q-20 0-42 6t-42 18-31 30-13 42q0 24 12 42t32 30 41 18 43 6zM384 640H256V512h128v128zM256 768h128v128H256V768zm896-256h128v128h-128V512zm-128 768H0V128h1536v512l-128 32V256h-128v128h-128V256H384v128H256V256H128v896h128v-128h128v128h640v128z" />
    </svg>
  ),
  displayName: 'MediaIcon',
});

export default MediaIcon;
