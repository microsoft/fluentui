import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ShopServerIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 1792q0 27 10 50t27 40 41 28 50 10h640v128H384q-53 0-99-20t-82-55-55-81-20-100V512h256V384q0-79 30-149t82-122 122-83T768 0q104 0 193 52 89-52 191-52 79 0 149 30t122 82 83 123 30 149v128h256v128H256v1152zM1408 384q0-53-20-99t-55-82-81-55-100-20q-45 0-85 15 29 36 46 71t25 70 11 71 3 77v80h256V384zM512 512h512V384q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100v128zm1408 256q27 0 50 10t40 27 28 41 10 50v1152h-896V896q0-27 10-50t27-40 41-28 50-10h640zm0 128h-640v1024h640V896zm-128 896h-384v-128h384v128zm0-256h-384v-128h384v128zm0-384h-384v-128h384v128z" />
    </svg>
  ),
  displayName: 'ShopServerIcon',
});

export default ShopServerIcon;
