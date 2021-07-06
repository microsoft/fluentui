import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CocktailsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 64q0 26-19 45l-749 750v1061h320q26 0 45 19t19 45q0 26-19 45t-45 19H576q-26 0-45-19t-19-45q0-26 19-45t45-19h320V859L147 109q-19-19-19-45t19-45 45-19h1536q26 0 45 19t19 45zM346 128l614 614 613-614H346z" />
    </svg>
  ),
  displayName: 'CocktailsIcon',
});

export default CocktailsIcon;
