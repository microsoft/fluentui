import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const VisualsStoreIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1152 0q79 0 149 30t122 82 83 123 30 149v128h256v640h-128V640h-256v768h-128V640H256v1152q0 27 10 50t27 40 41 28 50 10h640v128H384q-53 0-99-20t-82-55-55-81-20-100V512h256V384q0-79 30-149t82-122 122-83T768 0q104 0 193 52 89-52 191-52zm256 384q0-53-20-99t-55-82-81-55-100-20q-45 0-85 15 29 36 46 71t25 70 11 71 3 77v80h256V384zM512 512h512V384q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100v128zm1536 896v640h-128v-640h128zm-384-128h128v768h-128v-768zm-256 256h128v512h-128v-512zm-256 256h128v256h-128v-256z" />
    </svg>
  ),
  displayName: 'VisualsStoreIcon',
});

export default VisualsStoreIcon;
