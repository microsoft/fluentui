import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const IgnoreConversationIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 512h1792v640h-128V760l-768 384-768-384v776h640v128H256V512zm175 128l721 360 721-360H431zm1361-384v128H128v1024H0V256h1792zm-192 896q93 0 174 35t143 96 96 142 35 175q0 93-35 174t-96 143-142 96-175 35q-93 0-174-35t-143-96-96-142-35-175q0-93 35-174t96-143 142-96 175-35zm-320 448q0 66 25 124t68 102 102 69 125 25q47 0 92-13t84-40l-443-443q-26 39-39 84t-14 92zm587 176q26-39 39-84t14-92q0-66-25-124t-69-101-102-69-124-26q-47 0-92 13t-84 40l443 443z" />
    </svg>
  ),
  displayName: 'IgnoreConversationIcon',
});

export default IgnoreConversationIcon;
