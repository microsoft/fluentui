import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const NavigateExternalInlineIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 1408h128v640H256V640h640v128H384v1152h1152v-512zm128-768v640h-128V859l-595 594-90-90 594-595h-421V640h640z" />
    </svg>
  ),
  displayName: 'NavigateExternalInlineIcon',
});

export default NavigateExternalInlineIcon;
