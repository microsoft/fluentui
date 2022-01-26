import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const GenericScanFilledIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 128h512v512h-128V256h-384V128zM128 256v384H0V128h512v128H128zm1792 1536v-384h128v512h-512v-128h384zM256 1664V384h1536v1280H256zM1536 640v768h128V640h-128zm-384 0v768h128V640h-128zm-384 0v768h128V640H768zm-384 0v768h128V640H384zm-256 768v384h384v128H0v-512h128z" />
    </svg>
  ),
  displayName: 'GenericScanFilledIcon',
});

export default GenericScanFilledIcon;
