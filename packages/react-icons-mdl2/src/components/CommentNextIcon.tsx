import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CommentNextIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 128v1027l-128-128V256H128v1152h256v293l293-293h219v128H731l-475 475v-475H0V128h2048zm-355 1027l318 317-318 317-90-90 163-163h-614v-128h614l-163-163 90-90z" />
    </svg>
  ),
  displayName: 'CommentNextIcon',
});

export default CommentNextIcon;
