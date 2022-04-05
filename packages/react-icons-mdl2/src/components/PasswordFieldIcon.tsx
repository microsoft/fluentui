import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PasswordFieldIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 256h2048v1408H0V256zm1920 1280V384H128v1152h1792zM512 1120q-33 0-62-12t-51-35-34-51-13-62q0-33 12-62t35-51 51-34 62-13q33 0 62 12t51 35 34 51 13 62q0 33-12 62t-35 51-51 34-62 13zm512 0q-33 0-62-12t-51-35-34-51-13-62q0-33 12-62t35-51 51-34 62-13q33 0 62 12t51 35 34 51 13 62q0 33-12 62t-35 51-51 34-62 13zm512 0q-33 0-62-12t-51-35-34-51-13-62q0-33 12-62t35-51 51-34 62-13q33 0 62 12t51 35 34 51 13 62q0 33-12 62t-35 51-51 34-62 13z" />
    </svg>
  ),
  displayName: 'PasswordFieldIcon',
});

export default PasswordFieldIcon;
