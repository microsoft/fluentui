import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const OneDriveFileVaultIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M2048 256v1536h-128v128h-128v-128H256v128H128v-128H0V256h2048zm-128 1408V384H128v1280h1792zm-256-384v256H256V512h1408v256h128v128h-128v256h128v128h-128zM384 1408h1152v-128h-128v-128h128V896h-128V768h128V640H384v768zm512-640q53 0 99 20t82 55 55 81 20 100q0 53-20 99t-55 82-81 55-100 20q-53 0-99-20t-82-55-55-81-20-100q0-53 20-99t55-82 81-55 100-20zm0 416q33 0 62-12t51-35 34-51 13-62q0-33-12-62t-35-51-51-34-62-13q-33 0-62 12t-51 35-34 51-13 62q0 33 12 62t35 51 51 34 62 13z" />
    </svg>
  ),
  displayName: 'OneDriveFileVaultIcon',
});

export default OneDriveFileVaultIcon;
