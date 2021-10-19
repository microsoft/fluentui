import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MailLowImportanceIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 384h2048v1195l-128-128V648l-896 447-896-447v888h1333l-128 128H0V384zm143 128l881 441 881-441H143zm1649 1286l147-147 90 90-301 301-301-301 90-90 147 147v-774h128v774z" />
    </svg>
  ),
  displayName: 'MailLowImportanceIcon',
});

export default MailLowImportanceIcon;
