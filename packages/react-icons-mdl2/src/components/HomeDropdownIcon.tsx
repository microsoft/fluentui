import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const HomeDropdownIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1152 1536h896l-448 448-448-448zm0-128v-128H896v640H256v-805l-83 82-90-90 941-942 941 942-90 90-83-82v293h-128V987l-640-640-640 640v805h384v-640h512v256h-128z" />
    </svg>
  ),
  displayName: 'HomeDropdownIcon',
});

export default HomeDropdownIcon;
