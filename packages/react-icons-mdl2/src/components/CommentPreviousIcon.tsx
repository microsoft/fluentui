import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CommentPreviousIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 128v1024h-128V256H128v1152h256v293l293-293h222l-64 64 64 64H731l-475 475v-475H0V128h2048zm-614 1280h614v128h-614l163 163-90 90-318-317 318-317 90 90-163 163z" />
    </svg>
  ),
  displayName: 'CommentPreviousIcon',
});

export default CommentPreviousIcon;
