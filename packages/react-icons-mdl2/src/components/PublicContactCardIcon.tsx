import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PublicContactCardIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 896h-640V768h640v128zm-640 256h384v128h-384v-128zm-326-80q46 26 82 62t62 79 40 93 14 102H896q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100H256q0-52 14-101t39-93 62-80 83-62q-33-35-51-81t-19-95q0-53 20-99t55-82 81-55 100-20q53 0 99 20t82 55 55 81 20 100q0 49-18 95t-52 81zM512 896q0 27 10 50t27 40 41 28 50 10q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50zm1217 515l317 317-317 317-91-90 163-163h-658l163 163-91 90-317-317 317-317 91 90-163 163h658l-163-163 91-90zm319-1155v1216l-128-128V384H128v1280h640v128H0V256h2048z" />
    </svg>
  ),
  displayName: 'PublicContactCardIcon',
});

export default PublicContactCardIcon;
