import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const HexaditeInvestigationCancelIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M768 1169l197 113q9 7 28 25t40 40 40 41 29 30l-78 45-384-220V805l384-220 384 220v286l-128-128v-84l-256-146-256 146v290zM256 586v876l742 424-94 93-776-443V512L1024 0l896 512v451l-128 128V586l-768-439-768 439zm1773 675l-339 339 339 339-90 90-339-339-339 339-90-90 339-339-339-339 90-90 339 339 339-339 90 90z" />
    </svg>
  ),
  displayName: 'HexaditeInvestigationCancelIcon',
});

export default HexaditeInvestigationCancelIcon;
