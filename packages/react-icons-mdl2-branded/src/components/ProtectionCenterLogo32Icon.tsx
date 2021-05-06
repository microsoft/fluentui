import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const ProtectionCenterLogo32Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1216 640v192H832V640q0-40 15-75t41-61 61-41 75-15q40 0 75 15t61 41 41 61 15 75zm-512 704V896h640v448H704zm1152-997v443q0 132-33 248t-91 218-138 192-172 169-194 148-204 132q-103-62-204-131t-193-149-172-169-138-192-92-218-33-248V347q75 0 142-5t130-19 125-39 127-67q73-46 147-67t161-22q88 0 162 22t148 68q64 41 126 66t125 39 129 19 142 5zm-448 1061V832h-128V640q0-52-20-99t-55-81-82-55-99-21q-53 0-99 20t-81 55-55 82-21 99v192H640v576h768z" />
    </svg>
  ),
  displayName: 'ProtectionCenterLogo32Icon',
});

export default ProtectionCenterLogo32Icon;
