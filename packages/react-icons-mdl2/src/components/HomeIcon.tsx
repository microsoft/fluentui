import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const HomeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 165l941 942-90 90-83-82v805h-640v-640H896v640H256v-805l-83 82-90-90 941-942zm640 1627V987l-640-640-640 640v805h384v-640h512v640h384z" />
    </svg>
  ),
  displayName: 'HomeIcon',
});

export default HomeIcon;
