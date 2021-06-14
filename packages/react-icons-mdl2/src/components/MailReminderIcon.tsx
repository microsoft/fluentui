import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MailReminderIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 384v640h-128V648l-896 447-896-447v888h896v128H0V384h2048zM1024 953l881-441H143l881 441zm576 199q66 0 124 25t101 69 69 102 26 124v192h128v128h-256v64q0 40-15 75t-41 61-61 41-75 15q-40 0-75-15t-61-41-41-61-15-75v-64h-256v-128h128v-192q0-66 25-124t68-101 102-69 125-26zm64 640h-128v64q0 26 19 45t45 19q26 0 45-19t19-45v-64zm128-128v-192q0-40-15-75t-41-61-61-41-75-15q-40 0-75 15t-61 41-41 61-15 75v192h384z" />
    </svg>
  ),
  displayName: 'MailReminderIcon',
});

export default MailReminderIcon;
