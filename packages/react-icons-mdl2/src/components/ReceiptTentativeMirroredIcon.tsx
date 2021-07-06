import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ReceiptTentativeMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M704 256q97 0 187 25t168 71 143 110 110 142 71 169 25 187q0 97-25 187t-71 168-110 143-142 110-169 71-187 25q-97 0-187-25t-168-71-143-110-110-142-71-169T0 960q0-97 25-187t71-168 110-143 142-110 169-71 187-25zm0 1280q119 0 224-45t183-124 123-183 46-224q0-119-45-224t-124-183-183-123-224-46q-119 0-224 45T297 553 174 736t-46 224q0 119 45 224t124 183 183 123 224 46zm960-640h384v128h-384V896zm384-384v128h-512V512h512zm-384 768h384v128h-384v-128zm-1024 0h128v128H640v-128zm64-768q53 0 99 20t82 55 55 81 20 100H832q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50q0 29 14 52t35 45 47 44 46 51 36 63 14 81v48H640v-34q0-25-5-47t-25-42q-30-30-59-57t-52-58-37-65-14-81q0-53 20-99t55-82 81-55 100-20z" />
    </svg>
  ),
  displayName: 'ReceiptTentativeMirroredIcon',
});

export default ReceiptTentativeMirroredIcon;
