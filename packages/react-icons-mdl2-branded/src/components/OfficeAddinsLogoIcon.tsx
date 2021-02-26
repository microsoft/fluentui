import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const OfficeAddinsLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M128 1216l384-192 384 192v512l-384 192-384-192v-512zM1152 128l768 384v1024l-768 384-128-64v-736L512 864l-128 64V512l768-384z" />
    </svg>
  ),
  displayName: 'OfficeAddinsLogoIcon',
});

export default OfficeAddinsLogoIcon;
