import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SignOutIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 1792h896v128H128V0h1024v128H256v1664zm1679-832l-487 488-80-80 345-344H640V896h1073l-345-344 80-80 487 488z" />
    </svg>
  ),
  displayName: 'SignOutIcon',
});

export default SignOutIcon;
