import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TriggerAutoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1058 1411q-15 46-24 93t-10 96v12q0 6 1 13l-422 423H313l384-768H248L888 0h719l-384 768h660l-258 257h-10q-54 0-103 8t-101 25l162-162h-557l384-768H967L455 1152h449l-384 768h29l509-509zm856 128q6 30 6 61t-6 61l124 51-49 119-124-52q-35 51-86 86l52 124-119 49-51-124q-30 6-61 6t-61-6l-51 124-119-49 52-124q-51-35-86-86l-124 52-49-119 124-51q-6-30-6-61t6-61l-124-51 49-119 124 52q35-51 86-86l-52-124 119-49 51 124q30-6 61-6t61 6l51-124 119 49-52 124q51 35 86 86l124-52 49 119-124 51zm-314 253q40 0 75-15t61-41 41-61 15-75q0-40-15-75t-41-61-61-41-75-15q-40 0-75 15t-61 41-41 61-15 75q0 40 15 75t41 61 61 41 75 15z" />
    </svg>
  ),
  displayName: 'TriggerAutoIcon',
});

export default TriggerAutoIcon;
