import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const GatherIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 1920v-512h512v512H0zm128-384v256h256v-256H128zm1408-896h512v896h-512V640zm384 768v-256h-256v256h256zm0-384V768h-256v256h256zM0 1280V768h512v512H0zm128-384v256h256V896H128zM0 640V128h512v512H0zm128-384v256h256V256H128zm873 605l90-90 317 317-317 317-90-90 163-163H640v-128h524l-163-163z" />
    </svg>
  ),
  displayName: 'GatherIcon',
});

export default GatherIcon;
