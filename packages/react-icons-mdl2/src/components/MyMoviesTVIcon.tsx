import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MyMoviesTVIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 896v832q0 40-15 75t-41 61-61 41-75 15H320q-40 0-75-15t-61-41-41-61-15-75v-507q0-37 1-67t2-59 1-60-4-67q-2-21-6-38t-8-34-10-32-11-38L22 541l1738-434 124 497L713 896h1207zM681 508l-321 80 352 176 321-80-352-176zm543 129l322-81-352-175-322 80 352 176zm-1046 4l61 241 282-70-343-171zm1489-379l-282 71 342 171-60-242zm125 762H256v704q0 26 19 45t45 19h1408q26 0 45-19t19-45v-704z" />
    </svg>
  ),
  displayName: 'MyMoviesTVIcon',
});

export default MyMoviesTVIcon;
