import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChildofIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 256v128H128V256h896zm557 723l365 365-365 365-90-90 210-211H512V512h128v768h1061l-210-211 90-90z" />
    </svg>
  ),
  displayName: 'ChildofIcon',
});

export default ChildofIcon;
