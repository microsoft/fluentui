import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AutoFitWindowIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 2048V896h2048v1152h-128v-128h-512v128h-128v-128H768v128H640v-128H128v128H0zm1280-256v-384H768v384h512zm640 0v-384h-512v384h512zM128 1024v256h1792v-256H128zm0 384v384h512v-384H128zm0-896v256H0V128h128v256h256v128H128zm1792-384h128v640h-128V512h-384V384h384V128zM797 768H669L1120 0h128L797 768zm-93-384q-40 0-75-15t-61-41-41-61-15-75q0-40 15-75t41-61 61-41 75-15q40 0 75 15t61 41 41 61 15 75q0 40-15 75t-41 61-61 41-75 15zm0-288q-40 0-68 28t-28 68q0 40 28 68t68 28q40 0 68-28t28-68q0-40-28-68t-68-28zm320 480q0-40 15-75t41-61 61-41 75-15q40 0 75 15t61 41 41 61 15 75q0 40-15 75t-41 61-61 41-75 15q-40 0-75-15t-61-41-41-61-15-75zm288 0q0-40-28-68t-68-28q-40 0-68 28t-28 68q0 40 28 68t68 28q40 0 68-28t28-68z" />
    </svg>
  ),
  displayName: 'AutoFitWindowIcon',
});

export default AutoFitWindowIcon;
