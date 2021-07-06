import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CityNext2Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M512 1024H384V768h128v256zm256 0H640V768h128v256zm256 0H896V768h128v256zm-512 384H384v-256h128v256zm256 0H640v-256h128v256zm256 0H896v-256h128v256zm384-640q106 0 199 40t163 109 110 163 40 200v768h-128v-768q0-79-30-149t-82-122-123-83-149-30h-128v1152H768v-384H640v384H128V512h128V256h256V0h384v256h256v256h128v256h128zM640 256h128V128H640v128zM384 512h640V384H384v128zm768 128H256v1280h256v-384h384v384h256V640zm256 512h256v128h-256v-128zm0 256h256v128h-256v-128zm0 256h256v128h-256v-128zm0 256h256v128h-256v-128z" />
    </svg>
  ),
  displayName: 'CityNext2Icon',
});

export default CityNext2Icon;
