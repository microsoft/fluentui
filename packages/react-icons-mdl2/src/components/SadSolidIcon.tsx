import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SadSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 0q141 0 272 36t244 104 207 160 161 207 103 245 37 272q0 141-36 272t-104 244-160 207-207 161-245 103-272 37q-141 0-272-36t-244-104-207-160-161-207-103-245-37-272q0-141 36-272t104-244 160-207 207-161T752 37t272-37zM640 608q-33 0-62 12t-51 35-34 51-13 62q0 33 12 62t35 51 51 34 62 13q33 0 62-12t51-35 34-51 13-62q0-33-12-62t-35-51-51-34-62-13zm904 876q-50-55-109-99t-125-74-139-47-147-16q-75 0-147 16t-138 46-126 75-109 99l144 127q72-81 169-126t207-45q109 0 206 45t170 126l144-127zm-136-556q33 0 62-12t51-35 34-51 13-62q0-33-12-62t-35-51-51-34-62-13q-33 0-62 12t-51 35-34 51-13 62q0 33 12 62t35 51 51 34 62 13z" />
    </svg>
  ),
  displayName: 'SadSolidIcon',
});

export default SadSolidIcon;
