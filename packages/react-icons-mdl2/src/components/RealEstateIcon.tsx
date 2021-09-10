import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RealEstateIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1280 1920h384v128h-512v-896H768v896H256V987l-83 82-90-90 877-877 877 877-90 90-83-82v165h-128V859L960 282 384 859v1061h256v-896h640v896zm768-640v768h-128v-256h-512v-512h640zm-128 128h-384v256h384v-256z" />
    </svg>
  ),
  displayName: 'RealEstateIcon',
});

export default RealEstateIcon;
