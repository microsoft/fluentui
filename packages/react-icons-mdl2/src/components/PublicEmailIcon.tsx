import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PublicEmailIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1635 1373l90-90 317 317-317 317-90-90 163-163h-668l163 163-90 90-317-317 317-317 90 90-163 163h668l-163-163zM0 384h2048v1024l-128-128V583l-896 449-896-449v953h640v128H0V384zm271 128l753 376 753-376H271z" />
    </svg>
  ),
  displayName: 'PublicEmailIcon',
});

export default PublicEmailIcon;
