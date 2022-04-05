import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const WebAppBuilderSlotIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M0 1664v-256h128v256H0zM256 0v128H0V0h256zM0 2048v-256h128v256H0zM1792 0v128h-256V0h256zM0 1280v-256h128v256H0zm640-896h768l384 640-384 640H640l-384-640 384-640zm696 1152l307-512-307-512H712l-307 512 307 512h624zM640 0v128H384V0h256zM0 896V640h128v256H0zM1024 0v128H768V0h256zm384 0v128h-256V0h256zm512 1792v-256h128v256h-128zm0-768V768h128v256h-128zm0 384v-256h128v256h-128zm0-768V384h128v256h-128zm0-640h128v256h-128V0zM0 512V256h128v256H0zm640 1536v-128h256v128H640zm-384 0v-128h256v128H256zm1152 0v-128h256v128h-256zm-384 0v-128h256v128h-256zm768 0v-128h256v128h-256z" />
    </svg>
  ),
  displayName: 'WebAppBuilderSlotIcon',
});

export default WebAppBuilderSlotIcon;
