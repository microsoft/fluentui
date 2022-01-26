import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BusinessHoursSignIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1671 896q25 0 47 9t38 26 26 39 10 47v782q0 25-9 47t-26 38-39 26-47 10H249q-25 0-47-9t-38-26-26-39-10-47v-782q0-25 9-47t26-38 39-26 47-10h44l447-446q-18-29-27-62t-9-68q0-53 20-99t55-82 81-55 100-20q53 0 99 20t82 55 55 81 20 100q0 35-9 68t-27 62l447 446h44zM960 192q-27 0-50 10t-40 27-28 41-10 50q0 27 10 50t27 40 41 28 50 10q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10zM475 896h970l-355-356q-59 36-130 36-35 0-68-9t-62-27L475 896zm1189 128H256v768h1408v-768zm-256 384H512v-128h896v128z" />
    </svg>
  ),
  displayName: 'BusinessHoursSignIcon',
});

export default BusinessHoursSignIcon;
