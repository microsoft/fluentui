import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const OutlookLogoInverseIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M672 1027q0 39-9 74t-28 64-50 44-74 17q-42 0-72-17t-49-46-28-65-9-73q0-38 9-74t28-65 51-46 74-18q44 0 74 18t48 47 27 65 8 75zm1376-3v800q0 40-28 68t-68 28H608q-40 0-68-28t-28-68v-288H85q-35 0-60-25t-25-60V597q0-35 25-60t60-25h555V218q0-38 26-64t64-26h1100q38 0 64 26t26 64v708l106 61h1q9 6 15 16t6 21zm-512-704v256h256V320h-256zm0 384v256h256V704h-256zm0 384v156l260-156h-260zm-448-768v256h320V320h-320zm0 384v256h320V704h-320zm0 384v173l206 128 114-68v-233h-320zM768 320v192h171q5 0 10 1t11 3V320H768zM510 1364q77 0 137-26t101-73 62-110 22-137q0-71-21-132t-61-106-98-70-132-26q-79 0-140 25t-103 72-63 111-22 140q0 72 22 133t63 105 100 69 133 25zm130 428h1057l-673-420v79q0 35-25 60t-60 25H640v256zm1280-11v-618l-504 302 504 316z" />
    </svg>
  ),
  displayName: 'OutlookLogoInverseIcon',
});

export default OutlookLogoInverseIcon;
