import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CertificateIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M896 1280q0 82-33 156t-95 130v458l-256-128-256 128v-458q-61-55-94-129t-34-157q0-79 30-149t82-122 122-83 150-30q79 0 149 30t122 83 82 122 31 149zm-384 256q53 0 99-20t82-55 55-81 20-100q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100q0 53 20 99t55 82 81 55 100 20zm128 106q-61 22-123 22-70 0-133-22v174l128-64 128 64v-174zM1920 549v1499H896v-128h896V640h-512V128H384v624q-33 8-65 20t-63 28V0h1115l549 549zm-219-37l-293-293v293h293z" />
    </svg>
  ),
  displayName: 'CertificateIcon',
});

export default CertificateIcon;
