import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Warning12Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1884 2048H-7L939 57l945 1991zM263 1877h1351L939 455 263 1877zm761-1024v555H853V853h171zm-171 683h171v171H853v-171z" />
    </svg>
  ),
  displayName: 'Warning12Icon',
});

export default Warning12Icon;
