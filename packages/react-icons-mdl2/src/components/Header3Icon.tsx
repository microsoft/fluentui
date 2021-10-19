import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Header3Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M768 384h128v1408H768v-640H128v640H0V384h128v640h640V384zm851 674q67 7 125 32t102 67 69 99 25 127q0 103-39 179t-106 128-153 76-181 26q-80 0-160-15t-149-59v-167q138 108 315 108 61 0 118-15t100-48 70-81 26-118q0-69-22-116t-61-76-88-45-105-22-111-7-106-1V998h98q51 0 101-7t94-20 77-43 53-71 20-109q0-62-18-106t-51-72-80-41-107-13q-76 0-143 25t-128 72V462q71-42 150-60t160-18q74 0 142 20t121 61 83 102 31 142q0 139-70 223t-202 122v4z" />
    </svg>
  ),
  displayName: 'Header3Icon',
});

export default Header3Icon;
