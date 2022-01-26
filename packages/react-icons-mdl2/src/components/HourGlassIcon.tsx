import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const HourGlassIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 256q0 106-30 206t-91 189q-31 45-65 82t-72 67-82 57-92 49q-37 17-58 46t-22 72q0 42 21 71t59 47q49 23 92 49t81 56 73 68 65 82q60 88 90 188t31 207h128v128H128v-128h128q0-106 30-206t91-189q32-47 66-83t71-67 81-55 93-49q36-17 58-47t22-72q0-42-21-71t-59-47q-49-23-92-49t-81-56-73-68-65-82q-60-88-90-188t-31-207H128V128h1664v128h-128zm-640 768q0-82 43-142t115-95q29-14 56-27t53-33q58-40 103-92t77-113 48-128 17-138H384q0 70 16 137t48 128 77 113 104 93q26 19 53 32t56 28q72 35 115 95t43 142q0 82-43 142t-115 95q-29 14-56 27t-53 33q-58 40-103 92t-77 113-48 128-17 138h1152q0-70-16-137t-48-128-77-113-104-93q-26-19-53-32t-56-28q-72-35-115-95t-43-142z" />
    </svg>
  ),
  displayName: 'HourGlassIcon',
});

export default HourGlassIcon;
