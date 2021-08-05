import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const ExcelLogoInverse16Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1920 0q26 0 49 10t41 27 28 41 10 50v1792q0 26-10 49t-27 41-41 28-50 10H512q-26 0-49-10t-41-27-28-41-10-50v-256H128q-26 0-49-10t-41-27-28-41-10-50V512q0-26 10-49t27-41 41-28 50-10h256V128q0-26 10-49t27-41 41-28 50-10h1408zM496 1440l146-267 143 267h255l-259-419 253-413H790L650 863 521 608H262l246 414-270 418h258zm656 480v-256H512v256h640zm0-1536V128H512v256h640zm768 1536v-384h-640v384h640zm0-512v-384h-640v384h640zm0-512V512h-640v384h640zm0-512V128h-640v256h640z" />
    </svg>
  ),
  displayName: 'ExcelLogoInverse16Icon',
});

export default ExcelLogoInverse16Icon;
