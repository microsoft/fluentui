import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MicrophoneIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M704 1536q-40 0-75-15t-61-41-41-61-15-75V192q0-40 15-75t41-61 61-41 75-15h512q40 0 75 15t61 41 41 61 15 75v1152q0 40-15 75t-41 61-61 41-75 15H704zm-64-192q0 26 19 45t45 19h512q26 0 45-19t19-45V192q0-26-19-45t-45-19H704q-26 0-45 19t-19 45v1152zm1024-320v362q0 84-32 158t-87 129-129 87-158 32h-234v128h256v128H640v-128h256v-128H662q-84 0-158-32t-129-87-87-129-32-158v-362h128v362q0 57 22 108t59 88 89 60 108 22h596q57 0 108-22t88-59 60-89 22-108v-362h128z" />
    </svg>
  ),
  displayName: 'MicrophoneIcon',
});

export default MicrophoneIcon;
