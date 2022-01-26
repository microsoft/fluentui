import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DeleteIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 384h-128v1472q0 40-15 75t-41 61-61 41-75 15H448q-40 0-75-15t-61-41-41-61-15-75V384H128V256h512V128q0-27 10-50t27-40 41-28 50-10h384q27 0 50 10t40 27 28 41 10 50v128h512v128zM768 256h384V128H768v128zm768 128H384v1472q0 26 19 45t45 19h1024q26 0 45-19t19-45V384zM768 1664H640V640h128v1024zm256 0H896V640h128v1024zm256 0h-128V640h128v1024z" />
    </svg>
  ),
  displayName: 'DeleteIcon',
});

export default DeleteIcon;
