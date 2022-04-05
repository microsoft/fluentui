import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const ExcelLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1963 128q35 0 60 25t25 60v1622q0 35-25 60t-60 25H597q-35 0-60-25t-25-60v-299H85q-35 0-60-25t-25-60V597q0-35 25-60t60-25h427V213q0-35 25-60t60-25h1366zM512 1133l121 227h183l-203-330 199-324H637L525 911q-2 3-3 6t-4 8q-27-55-55-109t-56-110H221l194 326-212 328h184l125-227zm704 659v-256H640v256h576zm0-384v-320h-192v320h192zm0-448V640h-192v320h192zm0-448V256H640v256h576zm704 1280v-256h-576v256h576zm0-384v-320h-576v320h576zm0-448V640h-576v320h576zm0-448V256h-576v256h576z" />
    </svg>
  ),
  displayName: 'ExcelLogoIcon',
});

export default ExcelLogoIcon;
