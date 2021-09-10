import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BidiRtlIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1152 128v128h-128v1536h128v128H512v-128h128v-768H448q-93 0-174-35t-143-96-96-142T0 576q0-93 35-174t96-143 142-96 175-35h704zM640 896V256H448q-66 0-124 25t-102 69-69 102-25 124q0 66 25 124t68 102 102 69 125 25h192zm256 896V256H768v1536h128zM1920 486v1332l-666-666 666-666zm-128 308l-358 358 358 358V794z" />
    </svg>
  ),
  displayName: 'BidiRtlIcon',
});

export default BidiRtlIcon;
