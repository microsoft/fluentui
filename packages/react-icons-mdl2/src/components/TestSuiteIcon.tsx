import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TestSuiteIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M608 128q45 0 77 9t58 24 46 31 40 31 44 23 55 10h992q27 0 50 10t40 27 28 41 10 50v1363l-128-256V384H928q-31 0-54 9t-44 24-41 31-45 31-58 23-78 10H128v1152h809l-64 128H0V256q0-27 10-50t27-40 41-28 50-10h480zm0 256q24 0 42-4t33-13 29-20 32-27q-17-15-31-26t-30-20-33-13-42-5H128v128h480zm1355 1479q14 28 14 57 0 26-10 49t-27 41-41 28-50 10h-754q-26 0-49-10t-41-27-28-41-10-50q0-29 14-57l299-598v-241h-128V896h640v128h-128v241l299 598zm-242-199l-185-369v-271h-128v271l-185 369h498z" />
    </svg>
  ),
  displayName: 'TestSuiteIcon',
});

export default TestSuiteIcon;
