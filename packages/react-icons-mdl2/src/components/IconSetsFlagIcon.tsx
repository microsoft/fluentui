import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const IconSetsFlagIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 0h128v2048H256V0zm1782 576L512 1148V4l1526 572zM640 964l1034-388L640 188v776z" />
    </svg>
  ),
  displayName: 'IconSetsFlagIcon',
});

export default IconSetsFlagIcon;
