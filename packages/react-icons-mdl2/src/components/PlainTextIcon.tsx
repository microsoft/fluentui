import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PlainTextIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 1535v-255h128v256H128v-1zm384-895v256H384V640h128zm512 1024v-128h128v128h-128zm-128-384h128v256H896v-256zM768 896H640V640h128v256zM640 384v256H512V384h128zm128 512h128v384H256V896h128v256h384V896zM0 1664v-128h128v128H0zm1408-896h384v128h-384V768zm-128 256V896h128v128h-128zm0 256h128v256h-128v-256zm128 384v-128h256v128h-256zm384-768h128v768h-128v-128h-128v-128h128v-128h-384v-128h384V896z" />
    </svg>
  ),
  displayName: 'PlainTextIcon',
});

export default PlainTextIcon;
