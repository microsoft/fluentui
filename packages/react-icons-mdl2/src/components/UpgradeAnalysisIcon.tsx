import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const UpgradeAnalysisIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1277 1251l-90 90-163-163v550H896v-550l-163 163-90-90 317-318 317 318zm752 202l-557 558-269-270 90-90 179 178 467-466 90 90zM256 1920h896v128H128V0h1115l549 549v734l-128 128V640h-512V128H256v1792zM1280 512h293l-293-293v293z" />
    </svg>
  ),
  displayName: 'UpgradeAnalysisIcon',
});

export default UpgradeAnalysisIcon;
