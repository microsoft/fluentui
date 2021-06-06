import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RubyGemsLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M666 672h721l253 254q-154 155-306 307t-308 305L413 926l253-254zM1024 0l893 512v1024l-893 512-893-512V512L1024 0zm723 1438V608l-723-417-723 417v830l723 417 723-417z" />
    </svg>
  ),
  displayName: 'RubyGemsLogoIcon',
});

export default RubyGemsLogoIcon;
