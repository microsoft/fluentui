import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SpeakersIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M512 256v1664h1024V256H512zm1152 1792H384V128h1280v1920zm-640-896q-79 0-149-30t-122-83-82-122-31-149q0-79 30-149t83-122 122-82 149-31q79 0 149 30t122 83 82 122 31 149q0 79-30 149t-83 122-122 82-149 31zm0-640q-53 0-99 20t-81 55-55 82-21 99q0 53 20 99t55 81 81 55 100 21q52 0 99-20t81-55 55-81 21-100q0-52-20-99t-55-81-82-55-99-21zm0 1280q-53 0-99-20t-81-55-55-81-21-100q0-52 20-99t55-81 81-55 100-21q52 0 99 20t81 55 55 82 21 99q0 53-20 99t-55 81-82 55-99 21zm0-384q-27 0-50 10t-40 27-28 41-10 50q0 27 10 50t27 40 41 28 50 10q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10zm-96-640q0-19 7-36t21-31 31-21 37-8q19 0 36 7t31 21 21 31 8 37q0 20-7 37t-21 30-31 21-37 8q-20 0-37-7t-30-21-21-31-8-37z" />
    </svg>
  ),
  displayName: 'SpeakersIcon',
});

export default SpeakersIcon;
