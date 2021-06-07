import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const OrgIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 1280h256v640h-640v-640h256v-256H384v256h256v640H0v-640h256V896h640V640H640V0h640v640h-256v256h640v384zM768 128v384h384V128H768zM512 1792v-384H128v384h384zm1280 0v-384h-384v384h384z" />
    </svg>
  ),
  displayName: 'OrgIcon',
});

export default OrgIcon;
