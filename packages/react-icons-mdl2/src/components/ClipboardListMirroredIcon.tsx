import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ClipboardListMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 256v1792h1536V256h-512q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100H256zm1152 256H640V384h256V256q0-27 10-50t27-40 41-28 50-10q27 0 50 10t40 27 28 41 10 50v128h256v128zM384 384h128v256h1024V384h128v1536H384V384zm896 512H512v128h768V896zm0 384H512v128h768v-128zm0 384H512v128h768v-128zm256-768h-128v128h128V896zm0 384h-128v128h128v-128zm0 384h-128v128h128v-128z" />
    </svg>
  ),
  displayName: 'ClipboardListMirroredIcon',
});

export default ClipboardListMirroredIcon;
