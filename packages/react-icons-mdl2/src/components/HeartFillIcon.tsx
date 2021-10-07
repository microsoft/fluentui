import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const HeartFillIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1889 287q53 53 88 116t53 131 18 138-17 138-53 131-89 116l-865 864-865-864q-53-53-88-116T18 811 0 673t17-139 53-131 89-116q78-77 177-118t208-41q109 0 208 41t177 118l95 96 95-96q78-77 177-118t208-41q109 0 208 41t177 118z" />
    </svg>
  ),
  displayName: 'HeartFillIcon',
});

export default HeartFillIcon;
