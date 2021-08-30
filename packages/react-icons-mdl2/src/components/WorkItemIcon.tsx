import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const WorkItemIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1155 1920l128 128H256V256h512q0-53 20-99t55-82 81-55 100-20q53 0 99 20t82 55 55 81 20 100h512v1027l-128 128V384h-128v256H512V384H384v1536h771zM640 384v128h768V384h-256V256q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50v128H640zm1389 1069l-557 558-269-270 90-90 179 178 467-466 90 90z" />
    </svg>
  ),
  displayName: 'WorkItemIcon',
});

export default WorkItemIcon;
