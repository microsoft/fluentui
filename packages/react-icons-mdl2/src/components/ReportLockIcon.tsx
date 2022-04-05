import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ReportLockIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 1408h128v640h-768v-640h128v-128q0-53 20-99t55-82 81-55 100-20q53 0 99 20t82 55 55 81 20 100v128zm-384-128v128h256v-128q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50zm384 640v-384h-512v384h512zM896 1792H640v-384h256v384zm-384 0H256v-640h256v640zM0 0h987l549 549v347h-128V640H896V128H128v1792h1024v128H0V0zm1024 219v293h293l-293-293zm256 677v384h-128v512h-128V896h256z" />
    </svg>
  ),
  displayName: 'ReportLockIcon',
});

export default ReportLockIcon;
