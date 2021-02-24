import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const PlannerLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1771 64q35 0 60 25t25 60v982q0 35-25 60t-60 25h-491v299q0 35-25 60t-60 25H768v298q0 18-6 33t-18 27-27 19-34 7H277q-18 0-33-7t-27-18-18-27-7-34V149q0-35 25-60t60-25h1494zm-619 128H768v512h384V192zm-832 0v768h320V192H320zm320 1664v-768H320v768h320zm512-384V832H768v640h384zm576-384V192h-448v896h448z" />
    </svg>
  ),
  displayName: 'PlannerLogoIcon',
});

export default PlannerLogoIcon;
