import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DateTime2Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 993q60 41 107 93t81 114 50 131 18 141q0 119-45 224t-124 183-183 123-224 46q-91 0-176-27t-156-78-126-122-85-157H128V128h256V0h128v128h896V0h128v128h256v865zM256 256v256h1408V256h-128v128h-128V256H512v128H384V256H256zm643 1280q-3-31-3-64 0-119 45-224t124-183 183-123 224-46q100 0 192 33V640H256v896h643zm573 384q93 0 174-35t142-96 96-142 36-175q0-93-35-174t-96-142-142-96-175-36q-93 0-174 35t-142 96-96 142-36 175q0 93 35 174t96 142 142 96 175 36zm64-512h192v128h-320v-384h128v256z" />
    </svg>
  ),
  displayName: 'DateTime2Icon',
});

export default DateTime2Icon;
