import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const StoreLogo16Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1920 512v1260q0 30-11 57t-32 47-48 32-57 12H148q-30 0-57-11t-47-32-32-48-12-57V512h525v-64q0-90 34-169t93-138 139-94 169-34q90 0 169 34t138 93 94 139 34 169v64h152q-2-46-9-83t-22-68q-15-98-62-183 52 21 88 53t59 74 34 95 14 112h271zm-1293 0h156q4-72 19-131t47-105q24-15 52-24t59-9q43 0 84 19-44 12-73 33t-48 53-26 72-12 92h408v-64q0-69-26-129t-72-106-105-71-130-27q-69 0-129 26t-106 72-71 105-27 130v64zm269 768H512v384h384v-384zm0-512H512v384h384V768zm512 512h-384v384h384v-384zm0-512h-384v384h384V768z" />
    </svg>
  ),
  displayName: 'StoreLogo16Icon',
});

export default StoreLogo16Icon;
