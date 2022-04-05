import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const GripperDotsVerticalIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1152 384h256v256h-256V384zm0 768V896h256v256h-256zm0 512v-256h256v256h-256zM640 640V384h256v256H640zm0 512V896h256v256H640zm0 512v-256h256v256H640z" />
    </svg>
  ),
  displayName: 'GripperDotsVerticalIcon',
});

export default GripperDotsVerticalIcon;
