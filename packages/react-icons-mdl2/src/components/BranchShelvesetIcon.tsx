import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BranchShelvesetIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M896 1019q-83-11-153-50t-122-99-80-135-29-159q0-93 35-174t96-143 142-96 175-35q93 0 174 35t143 96 96 142 35 175q0 83-29 158t-80 135-121 99-154 51v517H896v-517zm64-763q-66 0-124 25t-102 69-69 102-25 124q0 66 25 124t68 102 102 69 125 25q66 0 124-25t101-68 69-102 26-125q0-66-25-124t-69-101-102-69-124-26zm960 896v768H0v-768h128v640h1664v-640h128z" />
    </svg>
  ),
  displayName: 'BranchShelvesetIcon',
});

export default BranchShelvesetIcon;
