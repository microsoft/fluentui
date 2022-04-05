import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CellPhoneIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 0q27 0 50 10t40 27 28 41 10 50v1792q0 27-10 50t-27 40-41 28-50 10H512q-27 0-50-10t-40-27-28-41-10-50V128q0-27 10-50t27-40 41-28 50-10h1024zm0 128H512v1792h1024V128zM896 1664h256v128H896v-128z" />
    </svg>
  ),
  displayName: 'CellPhoneIcon',
});

export default CellPhoneIcon;
