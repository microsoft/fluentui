import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DeliveryTruckIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1536h-524q-10 29-28 52t-41 40-52 26-59 10q-30 0-58-9t-52-26-42-40-28-53H628q-10 29-28 52t-41 40-52 26-59 10q-30 0-58-9t-52-26-42-40-28-53H0V384h1408v128h360l280 561v463zM128 1408h140q10-28 28-52t41-40 52-26 59-10q30 0 58 9t52 26 42 41 28 52h536q14-41 44-71t72-45V512H128v896zm320 128q26 0 45-19t19-45q0-26-19-45t-45-19q-26 0-45 19t-19 45q0 26 19 45t45 19zm896 0q26 0 45-19t19-45q0-26-19-45t-45-19q-26 0-45 19t-19 45q0 26 19 45t45 19zm576-433l-232-463h-280v652q41 14 71 44t45 72h396v-305z" />
    </svg>
  ),
  displayName: 'DeliveryTruckIcon',
});

export default DeliveryTruckIcon;
