import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ShopIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 512v1280q0 53-20 99t-55 81-82 55-99 21H384q-53 0-99-20t-81-55-55-81-21-100V512h256V384q0-79 30-149t83-122 122-82T768 0q104 0 193 52 89-52 191-52 79 0 149 30t122 83 82 122 31 149v128h256zm-384-128q0-52-20-99t-55-81-82-55-99-21q-45 0-85 15 29 36 46 71t25 70 11 71 3 77v80h256V384zM512 512h512V384q0-52-20-99t-55-81-82-55-99-21q-53 0-99 20t-81 55-55 82-21 99v128zm802 1408q-34-60-34-128V640H256v1152q0 27 10 50t27 40 41 28 50 10h930zm350-1280h-256v1152q0 27 10 50t27 40 41 28 50 10q27 0 50-10t40-27 28-41 10-50V640z" />
    </svg>
  ),
  displayName: 'ShopIcon',
});

export default ShopIcon;
