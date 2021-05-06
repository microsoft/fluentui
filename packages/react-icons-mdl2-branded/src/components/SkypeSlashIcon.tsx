import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const SkypeSlashIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1807 1605q0 41-16 77t-43 64-64 44-78 16q-40 0-76-15t-66-44L302 585q-28-28-43-65t-16-77q0-42 16-78t43-64 64-43 78-16q83 0 142 59l1162 1162q29 29 44 65t15 77z" />
    </svg>
  ),
  displayName: 'SkypeSlashIcon',
});

export default SkypeSlashIcon;
