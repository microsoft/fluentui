import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SquallsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 640q0 80-30 149t-82 122-123 83-149 30H0V896h1152q53 0 99-20t82-55 55-81 20-100q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100H768q0-79 30-149t82-122 122-83 150-30q79 0 149 30t122 82 83 123 30 149zm256 256q53 0 99 20t82 55 55 81 20 100q0 53-20 99t-55 82-81 55-100 20h-162q34 58 34 128 0 53-20 99t-55 82-81 55-100 20q-53 0-99-20t-82-55-55-81-20-100h128q0 27 10 50t27 40 41 28 50 10q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10H0v-128h1792q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50h-128q0-53 20-99t55-82 81-55 100-20z" />
    </svg>
  ),
  displayName: 'SquallsIcon',
});

export default SquallsIcon;
