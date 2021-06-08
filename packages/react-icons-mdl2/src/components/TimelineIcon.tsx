import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TimelineIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 1110q63 77 95 169t33 193q0 119-45 224t-124 183-183 123-224 46q-119 0-224-45t-183-124-123-183-46-224q0-100 33-192H0V256h256v128H128v256h768V384H768V256h384v128h-128v256h768V384h-128V256h256v854zm-927 42q40-60 93-107t114-81 131-50 141-18q86 0 167 24t153 73V768H128v384h865zm479 768q93 0 174-35t142-96 96-142 36-175q0-93-35-174t-96-142-142-96-175-36q-93 0-174 35t-142 96-96 142-36 175q0 93 35 174t96 142 142 96 175 36zm64-512h192v128h-320v-384h128v256z" />
    </svg>
  ),
  displayName: 'TimelineIcon',
});

export default TimelineIcon;
