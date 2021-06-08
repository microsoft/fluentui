import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PythonLanguageIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M480 384q93 0 171 22t137 69 90 119 33 172q0 102-37 179t-100 129-147 79-180 27H278v484H128V384h352zm-45 660q67 0 125-14t101-47 68-84 25-126q0-71-22-119t-63-78-95-43-120-13H278v524h157zm1549-660l-422 807v473h-151v-470l-411-810h171l286 578q9 19 16 39t18 40q6-20 15-40t19-39l300-578h159z" />
    </svg>
  ),
  displayName: 'PythonLanguageIcon',
});

export default PythonLanguageIcon;
