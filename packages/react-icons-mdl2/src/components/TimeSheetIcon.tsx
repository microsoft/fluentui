import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TimeSheetIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 256v1664H128V256h256v128H256v1408h1536V384h-128V256h256zm-384 384H512V0h1024v640zm-128-512H640v384h768V128zm-384 1024h128v128H896v-256h128v128zm-448 64q0-93 35-174t96-143 142-96 175-35q93 0 174 35t143 96 96 142 35 175q0 93-35 174t-96 143-142 96-175 35q-93 0-174-35t-143-96-96-142-35-175zm768 0q0-66-25-124t-69-101-102-69-124-26q-66 0-124 25t-102 69-69 102-25 124q0 66 25 124t68 102 102 69 125 25q66 0 124-25t101-68 69-102 26-125z" />
    </svg>
  ),
  displayName: 'TimeSheetIcon',
});

export default TimeSheetIcon;
