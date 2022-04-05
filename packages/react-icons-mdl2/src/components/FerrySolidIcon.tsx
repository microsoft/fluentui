import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FerrySolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1768 1792h152v128h-216q-12 24-29 47t-38 41-46 29-55 11q-41 0-71-9t-53-24-42-30-37-31-39-23-46-10q-26 0-46 9t-38 23-36 30-42 30-53 23-73 10q-42 0-72-9t-54-23-41-30-37-30-38-23-46-10q-26 0-46 9t-38 24-37 30-42 31-54 23-71 10q-31 0-56-10t-45-29-37-41-30-48l-2-3-214 3v-128h152L0 1487v-157l256-85V768h152l128-256h232V256h384v256h232l128 256h152v477l256 85v157l-152 305zM896 512h128V384H896v128zm640 690V896H384v306l576-192 576 192z" />
    </svg>
  ),
  displayName: 'FerrySolidIcon',
});

export default FerrySolidIcon;
