import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RobotIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M640 768h128v128H640V768zm512 0h128v128h-128V768zm469 640q35 0 66 13t54 37 37 55 14 66v469h-128v-469q0-18-12-30t-31-13H299q-18 0-30 12t-13 31v469H128v-469q0-35 13-66t37-54 54-37 67-14h341v-128h-85q-35 0-66-13t-55-37-36-54-14-67v-85H256V768h128v-85q0-35 13-66t37-54 54-37 67-14h341V303q-29-17-46-47t-18-64q0-27 10-50t27-40 41-28 50-10q27 0 50 10t40 27 28 41 10 50q0 34-17 64t-47 47v209h341q35 0 66 13t54 37 37 55 14 66v85h128v256h-128v85q0 35-13 66t-37 55-55 36-66 14h-85v128h341zM512 1109q0 18 12 30t31 13h810q18 0 30-12t13-31V683q0-18-12-30t-31-13H555q-18 0-30 12t-13 31v426zm256 299h384v-128H768v128z" />
    </svg>
  ),
  displayName: 'RobotIcon',
});

export default RobotIcon;
