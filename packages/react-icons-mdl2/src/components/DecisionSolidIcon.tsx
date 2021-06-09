import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DecisionSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M490 1343q-25 0-48-10t-42-28L37 942Q0 905 0 852q0-27 10-50t27-40 41-27 50-10q26 0 49 9t42 28l362 362q18 18 27 41t10 50q0 26-10 49t-27 41-41 28-50 10zm724-724q-25 0-48-10t-42-28L762 219q-38-38-38-91 0-27 10-50t27-40 41-28 50-10q53 0 90 37l363 363q18 18 27 41t10 50q0 26-10 49t-27 41-41 28-50 10zm-520 391L332 648l316-316 362 362-316 316zm1244 838q19 19 19 45t-19 45-45 19q-26 0-45-19L897 988l91-91 950 951zM0 1920h1024v128H0v-128zm128-256h768v128H128v-128z" />
    </svg>
  ),
  displayName: 'DecisionSolidIcon',
});

export default DecisionSolidIcon;
