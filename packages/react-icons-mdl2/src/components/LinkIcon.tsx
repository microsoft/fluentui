import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const LinkIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 768v128q76 0 145 17t123 56 84 99 32 148q0 66-25 124t-69 101-102 69-124 26h-512q-66 0-124-25t-101-69-69-102-26-124q0-87 31-147t85-99 122-56 146-18V768h-64q-93 0-174 35t-142 96-96 142-36 175q0 93 35 174t96 142 142 96 175 36h512q93 0 174-35t142-96 96-142 36-175q0-93-35-174t-96-142-142-96-175-36h-64zm-640 512v-128q76 0 145-17t123-56 84-99 32-148q0-66-25-124t-69-101-102-69-124-26H448q-66 0-124 25t-101 69-69 102-26 124q0 87 31 147t85 99 122 56 146 18v128h-64q-93 0-174-35t-142-96-96-142T0 832q0-93 35-174t96-142 142-96 175-36h512q93 0 174 35t142 96 96 142 36 175q0 93-35 174t-96 142-142 96-175 36h-64z" />
    </svg>
  ),
  displayName: 'LinkIcon',
});

export default LinkIcon;
