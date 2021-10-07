import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const OrientationIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1408 1664H0V768h1408v896zm-128-768H128v640h1152V896zM128 640H0V512h128v128zm0-256H0V256h128v128zm0-256H0V0h128v128zm768 0H768V0h128v128zm-512 0H256V0h128v128zm256 0H512V0h128v128zm256 256H768V256h128v128zm0 256H768V512h128v128zm731-512q102 102 180 197t132 200 81 226 28 273q0 141-36 272t-103 245-160 207-208 160-245 103-272 37v-128q123 0 237-32t214-90 182-141 140-181 91-214 32-238q0-133-25-242t-74-204-120-182-165-177v293h-128V0h512v128h-293z" />
    </svg>
  ),
  displayName: 'OrientationIcon',
});

export default OrientationIcon;
