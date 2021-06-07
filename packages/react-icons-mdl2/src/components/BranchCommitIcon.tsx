import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BranchCommitIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1408 960q0 83-29 158t-80 135-121 99-154 51v517H896v-517q-83-11-153-50t-122-99-80-135-29-159q0-83 29-158t80-135 121-99 154-51V0h128v517q83 11 153 50t122 99 80 135 29 159zm-448 320q66 0 124-25t101-68 69-102 26-125q0-66-25-124t-69-101-102-69-124-26q-66 0-124 25t-102 69-69 102-25 124q0 66 25 124t68 102 102 69 125 25z" />
    </svg>
  ),
  displayName: 'BranchCommitIcon',
});

export default BranchCommitIcon;
