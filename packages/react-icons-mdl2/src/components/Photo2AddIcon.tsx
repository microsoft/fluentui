import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Photo2AddIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1408 576q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19q-26 0-45-19t-19-45zm640 960v128h-256v256h-128v-256h-256v-128h256v-256h128v256h256zM922 1216l358 357v91H0V256h1792v896h-128V384H128v421l192-191 512 512 256-256 448 447v91h-91l-357-358-166 166zM320 794L128 987v549h933L320 794z" />
    </svg>
  ),
  displayName: 'Photo2AddIcon',
});

export default Photo2AddIcon;
