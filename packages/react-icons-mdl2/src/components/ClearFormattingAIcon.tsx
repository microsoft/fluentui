import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ClearFormattingAIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M640 0l329 988-105 105-65-197H353l-85 256H128L512 0h128zM396 768h360L576 228 396 768z" />
    </svg>
  ),
  displayName: 'ClearFormattingAIcon',
});

export default ClearFormattingAIcon;
