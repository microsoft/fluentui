import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ProtectRestrictIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1600 1152q93 0 174 35t143 96 96 142 35 175q0 93-35 174t-96 143-142 96-175 35q-93 0-174-35t-143-96-96-142-35-175q0-93 35-174t96-143 142-96 175-35zm0 768q66 0 124-25t101-68 69-102 26-125q0-66-25-124t-69-101-102-69-124-26q-66 0-124 25t-102 69-69 102-25 124q0 66 25 124t68 102 102 69 125 25zm-192-384h384v128h-384v-128zm-352 384q25 36 54 68t63 60H256V896h256V522q0-108 39-203t108-166T821 41t203-41q109 0 202 41t163 112 108 166 39 203v374h256v128H384v896h672zM640 896h768V522q0-81-29-152t-80-126-122-85-153-31q-82 0-152 31t-122 85-81 125-29 153v374z" />
    </svg>
  ),
  displayName: 'ProtectRestrictIcon',
});

export default ProtectRestrictIcon;
