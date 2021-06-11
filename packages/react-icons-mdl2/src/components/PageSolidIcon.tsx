import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PageSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1755 512h-475V37l475 475zm37 128v1408H128V0h1024v640h640z" />
    </svg>
  ),
  displayName: 'PageSolidIcon',
});

export default PageSolidIcon;
