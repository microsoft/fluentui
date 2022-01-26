import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CompanyDirectoryIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 0v2048H256v-254H128v-128h128v-257H128v-128h128V769H128V641h128V385H128V257h128V0h1664zm-128 128H384v1792h1408V128zm-128 384h-640V384h640v128zm0 256h-640V640h640v128zm-960 892q-39 0-73-14t-60-40-40-60-15-74q0-39 14-73t40-59 60-41 74-15q39 0 73 15t59 40 41 60 15 73q0 39-15 73t-40 60-60 40-73 15zm0-256q-29 0-48 19t-20 49q0 29 19 48t49 20q29 0 48-19t20-49q0-29-19-48t-49-20zm0-640q-39 0-73-14t-60-40-40-60-15-74q0-39 14-73t40-59 60-41 74-15q39 0 73 15t59 40 41 60 15 73q0 39-15 73t-40 60-60 40-73 15zm0-256q-29 0-48 19t-20 49q0 29 19 48t49 20q29 0 48-19t20-49q0-29-19-48t-49-20zm960 900h-640v-128h640v128zm0 256h-640v-128h640v128z" />
    </svg>
  ),
  displayName: 'CompanyDirectoryIcon',
});

export default CompanyDirectoryIcon;
