import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AccountManagementIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1148 1152q-83-62-179-95t-201-33q-88 0-170 23t-153 64-129 100-100 130-65 153-23 170H0q0-120 35-231t101-205 156-167 204-115q-56-35-100-82t-76-104-47-119-17-129q0-106 40-199t110-162T569 41 768 0q106 0 199 40t162 110 110 163 41 199q0 66-16 129t-48 119-76 103-101 83q60 23 113 54v152h-4zM384 512q0 80 30 149t82 122 122 83 150 30q79 0 149-30t122-82 83-122 30-150q0-79-30-149t-82-122-123-83-149-30q-80 0-149 30t-122 82-83 123-30 149zm1664 768v768H1024v-768h256v-256h512v256h256zm-640 0h256v-128h-256v128zm512 384h-128v128h-128v-128h-256v128h-128v-128h-128v256h768v-256zm0-256h-768v128h768v-128z" />
    </svg>
  ),
  displayName: 'AccountManagementIcon',
});

export default AccountManagementIcon;
