import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const GenericScanIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 640V128h512v128H128v384H0zm128 768v384h384v128H0v-512h128zm1792 384v-384h128v512h-512v-128h384zM1536 128h512v512h-128V256h-384V128zM384 1408V640h128v768H384zm384 0V640h128v768H768zm384 0V640h128v768h-128zm512-768v768h-128V640h128z" />
    </svg>
  ),
  displayName: 'GenericScanIcon',
});

export default GenericScanIcon;
