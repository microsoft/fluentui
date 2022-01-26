import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DependencyRemoveIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 512v640h512v128H0V384h1280v512h-128V512H128zm640 1408v-896h1280v896H768zm128-768v640h1024v-640H896zM2048 92l-228 228 228 228-91 92-229-229-228 229-92-91 229-229-229-229 92-91 228 229L1957 0l91 92z" />
    </svg>
  ),
  displayName: 'DependencyRemoveIcon',
});

export default DependencyRemoveIcon;
