import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const OfficeStoreLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1536 512h512v1344q0 40-15 75t-41 61-61 41-75 15H192q-40 0-75-15t-61-41-41-61-15-75V512h512q0-106 40-199t109-163T824 40t200-40q106 0 199 40t163 109 110 163 40 200zm-512-384q-80 0-149 30t-122 82-83 123-30 149h768q0-79-30-149t-82-122-123-83-149-30zm896 1728V640H128v1216q0 26 19 45t45 19h1664q26 0 45-19t19-45z" />
    </svg>
  ),
  displayName: 'OfficeStoreLogoIcon',
});

export default OfficeStoreLogoIcon;
