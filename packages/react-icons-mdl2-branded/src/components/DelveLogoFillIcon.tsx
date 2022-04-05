import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const DelveLogoFillIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M620 574q95 0 158 35t101 95 53 137 16 162q0 80-18 160t-60 146-107 107-159 41q-65 0-130-6t-130-12V596q66-6 138-14t138-8zm1332-286v1472h-768V288h768z" />
    </svg>
  ),
  displayName: 'DelveLogoFillIcon',
});

export default DelveLogoFillIcon;
