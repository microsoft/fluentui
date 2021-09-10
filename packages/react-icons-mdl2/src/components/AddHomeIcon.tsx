import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AddHomeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M768 1664v-640h512v768h-128v-640H896v640H256V987l-83 82-90-90 941-942 941 942-90 90-83-82v293h-128V859l-640-640-640 640v805h384zm1024 0h256v128h-256v256h-128v-256h-256v-128h256v-256h128v256z" />
    </svg>
  ),
  displayName: 'AddHomeIcon',
});

export default AddHomeIcon;
