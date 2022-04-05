import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AnchorLockIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1216 640q26 0 45 19t19 45q0 26-19 45t-45 19h-192v1017q33-3 65-11t63-20v136q-47 14-95 22t-97 8q-91 0-176-22t-160-64-138-99-111-129-78-153-38-173H128l192-256 192 256H391q11 100 54 187t110 154 154 110 187 54V768H704q-26 0-45-19t-19-45q0-26 19-45t45-19h192V500q-29-10-52-28t-40-41-26-52-10-59q0-40 15-75t41-61 61-41 75-15q40 0 75 15t61 41 41 61 15 75q0 30-9 58t-26 52-41 42-52 28v140h192zM960 384q26 0 45-19t19-45q0-26-19-45t-45-19q-26 0-45 19t-19 45q0 26 19 45t45 19zm1088 1024v640h-768v-640h128v-128q0-53 20-99t55-82 81-55 100-20q53 0 99 20t82 55 55 81 20 100v128h128zm-512 0h256v-128q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50v128zm384 128h-512v384h512v-384z" />
    </svg>
  ),
  displayName: 'AnchorLockIcon',
});

export default AnchorLockIcon;
