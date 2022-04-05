import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StepInsertIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 256v1408H128v-640h512V640h512V256h768zm-128 128h-512v384H768v384H256v384h1536V384zm-1274 0H0V256h518L355 93l90-90 317 317-317 317-90-90 163-163z" />
    </svg>
  ),
  displayName: 'StepInsertIcon',
});

export default StepInsertIcon;
