import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const VisioLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1984 597v790q0 35-25 60t-60 25h-429q-6 95-46 176t-104 142-149 95-179 35q-84 0-162-29t-141-80-107-121-59-154H85q-35 0-60-25t-25-60V597q0-35 25-60t60-25h433q-6-15-6-32 0-35 25-60L932 25q25-25 60-25t60 25l395 395q25 25 25 60 0 17-6 32h433q35 0 60 25t25 60zM992 146L658 480l32 32h249q35 0 60 25t25 60v185l302-302-334-334zM592 1360l255-672H681q-42 123-85 244t-83 245q-41-123-82-244t-83-245H178l251 672h163zm400 432q73 0 137-27t112-76 75-112 28-137q0-67-25-128t-68-109-101-78-126-35v361q0 35-25 60t-60 25H655q17 56 49 103t76 81 98 53 114 19zm864-448V640h-509q-11 11-36 37t-59 60-70 71-69 68-56 53-33 25v8q80 3 152 34t131 82 98 120 56 146h395z" />
    </svg>
  ),
  displayName: 'VisioLogoIcon',
});

export default VisioLogoIcon;
