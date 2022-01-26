import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BookAnswersIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M384 0h1408v2048H384q-53 0-99-20t-82-55-55-81-20-100V256q0-53 20-99t55-82 81-55T384 0zm1280 1920v-256H384q-27 0-50 10t-40 27-28 41-10 50q0 27 10 50t27 40 41 28 50 10h1280zm0-384V128H384q-27 0-50 10t-40 27-28 41-10 50v1314q60-34 128-34h1280zm-768-256V640h128v640H896zm0-768V384h128v128H896z" />
    </svg>
  ),
  displayName: 'BookAnswersIcon',
});

export default BookAnswersIcon;
