import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Orientation2Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 768v128h-128V768h128zm0-768v128h-128V0h128zm256 0v128h-128V0h128zm0 768v128h-128V768h128zm128-384V256h128v128h-128zm0 256V512h128v128h-128zM1280 0v1408H384V0h896zm-128 1280V128H512v1152h640zM1920 0h128v128h-128V0zm0 896V768h128v128h-128zm-384 640v-128h512v512h-128v-293q-103 103-199 181t-201 132-225 81-271 27q-142 0-273-36t-244-103-207-160-160-207-103-245-37-273h128q0 124 32 238t90 213 141 182 181 140 214 91 238 32q132 0 241-25t204-75 183-120 177-164h-293z" />
    </svg>
  ),
  displayName: 'Orientation2Icon',
});

export default Orientation2Icon;
