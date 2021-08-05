import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const WordLogoInverseIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1963 128q35 0 60 25t25 60v1622q0 35-25 60t-60 25H597q-35 0-60-25t-25-60v-299H85q-35 0-60-25t-25-60V597q0-35 25-60t60-25h427V213q0-35 25-60t60-25h1366zM515 956l123 404h140l134-672H771l-80 397-113-384H459l-120 386-80-399H112l134 672h140l129-404zm1405 836v-256H640v256h1280zm0-384v-320h-896v320h896zm0-448V640h-896v320h896zm0-448V256H640v256h1280z" />
    </svg>
  ),
  displayName: 'WordLogoInverseIcon',
});

export default WordLogoInverseIcon;
