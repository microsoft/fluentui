import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MailAttachedIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 384h2048v768h-128V648l-244 121h-141q-70 0-142-1l512-256H143l881 441v142L128 648v888h896v128H0V384zm1920 896h128v320q0 93-35 174t-96 142-142 96-175 36q-93 0-174-35t-142-96-96-142-36-175v-384q0-66 25-124t68-101 102-69 125-26q66 0 124 25t101 69 69 102 26 124v320q0 40-15 75t-41 61-61 41-75 15q-40 0-75-15t-61-41-41-61-15-75v-256h128v256q0 26 19 45t45 19q26 0 45-19t19-45v-320q0-40-15-75t-41-61-61-41-75-15q-40 0-75 15t-61 41-41 61-15 75v384q0 66 25 124t68 102 102 69 125 25q66 0 124-25t101-68 69-102 26-125v-320z" />
    </svg>
  ),
  displayName: 'MailAttachedIcon',
});

export default MailAttachedIcon;
