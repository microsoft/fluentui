import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Photo2Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 256v1536H0V256h2048zM128 384v677l448-447 640 640 256-256 448 447V384H128zm0 1280h1317L576 794l-448 449v421zm1792 0v-37l-448-449-166 166 321 320h293zm-320-896q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19z" />
    </svg>
  ),
  displayName: 'Photo2Icon',
});

export default Photo2Icon;
