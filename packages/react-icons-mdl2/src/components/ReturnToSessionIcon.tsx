import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ReturnToSessionIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M885 512q-155 0-294 58T342 737Q233 846 175 985t-58 295q0 106 27 204t78 183 120 156 155 120 184 77 204 28h896v-128H885q-88 0-170-23t-153-64-129-100-100-130-65-153-23-170q0-88 23-170t64-153 100-129 130-100 153-65 170-23h821l-426 427 74 74 566-565-566-565-74 74 426 427H885z" />
    </svg>
  ),
  displayName: 'ReturnToSessionIcon',
});

export default ReturnToSessionIcon;
