import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TagSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 0h896v896L896 1920 0 1024 1024 0zm448 624q36 0 68-14t56-38 38-56 14-68q0-36-14-68t-38-56-56-38-68-14q-36 0-68 14t-56 38-38 56-14 68q0 36 14 68t38 56 56 38 68 14z" />
    </svg>
  ),
  displayName: 'TagSolidIcon',
});

export default TagSolidIcon;
