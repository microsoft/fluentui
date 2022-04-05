import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SaveAndCloseIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1152 768q27 0 50 10t40 27 28 41 10 50v1152H165L0 1883V896q0-27 10-50t27-40 41-28 50-10h1024zM384 896v384h512V896H384zm512 1024v-256H384v256h128v-128h128v128h256zm256-1024h-128v512H256V896H128v933l91 91h37v-384h768v384h128V896zM512 640H384V0h512v128H512v512zM1920 0v1024h-512V896h384V128h-128V0h256zm-571 256L1187 93l90-90 318 317-318 317-90-90 162-163H768v256H640V256h709zm65 64l-6-5v10l6-5z" />
    </svg>
  ),
  displayName: 'SaveAndCloseIcon',
});

export default SaveAndCloseIcon;
