import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CreateMailRuleIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1152v896H640v-896h1408zM935 1280l409 245 409-245H935zm985 640v-591l-576 346-576-346v591h1152zM928 512q-31 0-54 9t-44 24-41 31-45 31-58 23-78 10H128v896h384v128H0V384q0-27 10-50t27-40 41-28 50-10h480q45 0 77 9t58 24 46 31 40 31 44 23 55 10h736q27 0 50 10t40 27 28 41 10 50v512h-128V512H928zM128 384v128h480q24 0 42-4t33-13 29-20 32-27q-17-15-31-26t-30-20-33-13-42-5H128z" />
    </svg>
  ),
  displayName: 'CreateMailRuleIcon',
});

export default CreateMailRuleIcon;
