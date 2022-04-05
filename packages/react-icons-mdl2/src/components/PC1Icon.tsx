import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PC1Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1536h-640v128h256v128h-640v-128h256v-128H896v256H0V128h896v512h1152v896zm-128-128V768H768v640h1152zM768 1664v-128H256v-128h384v-128H256v-128h384V640h128V256H128v1408h640zM640 384v128H256V384h384z" />
    </svg>
  ),
  displayName: 'PC1Icon',
});

export default PC1Icon;
