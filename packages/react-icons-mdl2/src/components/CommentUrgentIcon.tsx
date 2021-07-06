import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CommentUrgentIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 128v1408H731l-475 475v-475H0V128h2048zm-128 128H128v1152h256v293l293-293h1243V256zm-896 640H896V384h128v512zm0 256H896v-128h128v128z" />
    </svg>
  ),
  displayName: 'CommentUrgentIcon',
});

export default CommentUrgentIcon;
