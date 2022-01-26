import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PaddingIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 0h128v128H0V0zm1920 0v128h-128V0h128zM256 0h256v128H256V0zm640 128H640V0h256v128zm384 0h-256V0h256v128zM1408 0h256v128h-256V0zM0 1920h128v128H0v-128zm1792 0h128v128h-128v-128zm-1536 0h256v128H256v-128zm384 0h256v128H640v-128zm384 0h256v128h-256v-128zm384 0h256v128h-256v-128zM1024 603v842l211-210 90 90-365 365-365-365 90-90 211 210V603L685 813l-90-90 365-365 365 365-90 90-211-210z" />
    </svg>
  ),
  displayName: 'PaddingIcon',
});

export default PaddingIcon;
