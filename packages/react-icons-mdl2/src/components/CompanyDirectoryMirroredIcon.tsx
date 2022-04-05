import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CompanyDirectoryMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 0v2048h1664v-254h128v-128h-128v-257h128v-128h-128V769h128V641h-128V385h128V257h-128V0H128zm128 128h1408v1792H256V128zm128 384h640V384H384v128zm0 256h640V640H384v128zm960 892q39 0 73-14t60-40 40-60 15-74q0-39-14-73t-40-59-60-41-74-15q-39 0-73 15t-59 40-41 60-15 73q0 39 15 73t40 60 60 40 73 15zm0-256q29 0 48 19t20 49q0 29-19 48t-49 20q-29 0-48-19t-20-49q0-29 19-48t49-20zm0-640q39 0 73-14t60-40 40-60 15-74q0-39-14-73t-40-59-60-41-74-15q-39 0-73 15t-59 40-41 60-15 73q0 39 15 73t40 60 60 40 73 15zm0-256q29 0 48 19t20 49q0 29-19 48t-49 20q-29 0-48-19t-20-49q0-29 19-48t49-20zm-960 900h640v-128H384v128zm0 256h640v-128H384v128z" />
    </svg>
  ),
  displayName: 'CompanyDirectoryMirroredIcon',
});

export default CompanyDirectoryMirroredIcon;
