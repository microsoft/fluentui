import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TagIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1472 576q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10zM1024 0h896v896L896 1920 0 1024 1024 0zm768 843V128h-715l-896 896 715 715 896-896z" />
    </svg>
  ),
  displayName: 'TagIcon',
});

export default TagIcon;
