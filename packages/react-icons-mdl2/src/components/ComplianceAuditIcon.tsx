import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ComplianceAuditIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1033 1280q-14 30-21 62t-13 66H384v-128h649zm-649 384v-128h613q5 33 14 65t23 63H384zm-128 256h1349l127 128H128V0h1115l549 549v568q-29-26-61-47t-67-37V640h-512V128H256v1792zM1280 219v293h293l-293-293zm24 805q-109 41-187 128H384v-128h920zM384 512h640v128H384V512zm1152 256v128H384V768h1152zm512 1216q0 26-19 45t-45 19q-26 0-45-19l-291-290q-39 26-84 39t-92 14q-66 0-124-25t-102-68-69-102-25-125q0-66 25-124t68-101 102-69 125-26q66 0 124 25t101 69 69 102 26 124q0 47-13 92t-40 84l290 291q19 19 19 45zm-768-512q0 40 15 75t41 61 61 41 75 15q40 0 75-15t61-41 41-61 15-75q0-40-15-75t-41-61-61-41-75-15q-40 0-75 15t-61 41-41 61-15 75z" />
    </svg>
  ),
  displayName: 'ComplianceAuditIcon',
});

export default ComplianceAuditIcon;
