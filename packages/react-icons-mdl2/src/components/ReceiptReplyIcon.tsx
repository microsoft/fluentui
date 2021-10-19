import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ReceiptReplyIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M704 256q97 0 187 25t168 71 143 110 110 142 71 169 25 187q0 97-25 187t-71 168-110 143-142 110-169 71-187 25q-97 0-187-25t-168-71-143-110-110-142-71-169T0 960q0-97 25-187t71-168 110-143 142-110 169-71 187-25zm0 1280q119 0 224-45t183-124 123-183 46-224q0-119-45-224t-124-183-183-123-224-46q-119 0-224 45T297 553 174 736t-46 224q0 119 45 224t124 183 183 123 224 46zM475 896h677v128H475l210 211-90 90-365-365 365-365 90 90-210 211zm1189 0h384v128h-384V896zm384-384v128h-512V512h512zm-384 768h384v128h-384v-128z" />
    </svg>
  ),
  displayName: 'ReceiptReplyIcon',
});

export default ReceiptReplyIcon;
