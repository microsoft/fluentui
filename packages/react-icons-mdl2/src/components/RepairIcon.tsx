import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RepairIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1930 220q26 45 47 86t38 83 24 87 9 100q0 79-20 152t-58 138-91 117-117 90-137 58-153 21q-23 0-46-2t-47-6l-806 806q-48 48-109 73t-129 25q-69 0-130-26t-106-72-72-107-27-130q0-67 25-128t73-110l806-806q-4-23-6-46t-2-47q0-79 20-152t58-138 91-117 117-90 137-58 153-21q54 0 99 8t88 25 83 37 86 48l-394 394 102 102 394-394zm-458 804q93 0 174-35t142-96 96-142 36-175q0-73-24-141l-360 359-282-282 359-360q-68-24-141-24-93 0-174 35t-142 96-96 142-36 175q0 35 6 68t14 66l-855 856q-29 29-45 67t-16 80q0 42 16 80t45 66 66 44 80 17q42 0 80-16t67-45l856-855q33 8 66 14t68 6z" />
    </svg>
  ),
  displayName: 'RepairIcon',
});

export default RepairIcon;
