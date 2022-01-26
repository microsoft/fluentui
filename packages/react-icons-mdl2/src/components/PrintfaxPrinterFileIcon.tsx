import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PrintfaxPrinterFileIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 549v1499H128V0h1115l549 549zm-512 731v128h128v-384h-128v128H640v-128H512v384h128v-128h640zm-512 128v128h384v-128H768zm384-384V640H768v384h384zm128-512h293l-293-293v293zm384 1408V640h-384v256h256v640h-256v128H640v-128H384V896h256V512h512V128H256v1792h1408z" />
    </svg>
  ),
  displayName: 'PrintfaxPrinterFileIcon',
});

export default PrintfaxPrinterFileIcon;
