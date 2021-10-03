import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PaddingTopIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 1920h1920v128H0v-128zM128 128H0V0h128v128zM1920 0v128h-128V0h128zM512 128H256V0h256v128zm384 0H640V0h256v128zm384 0h-256V0h256v128zm384 0h-256V0h256v128zM685 813l-90-90 365-365 365 365-90 90-211-210v1061H896V603L685 813z" />
    </svg>
  ),
  displayName: 'PaddingTopIcon',
});

export default PaddingTopIcon;
