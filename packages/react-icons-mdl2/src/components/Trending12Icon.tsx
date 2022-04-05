import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Trending12Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 341v683h-171V633l-768 768-341-342-665 665-121-120 786-786 341 341 648-647h-392V341h683z" />
    </svg>
  ),
  displayName: 'Trending12Icon',
});

export default Trending12Icon;
