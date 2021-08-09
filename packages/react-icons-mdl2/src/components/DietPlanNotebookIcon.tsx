import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DietPlanNotebookIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1668 129h124v1919H256V129h126V0h128v129h258V0h128v129h258V0h128v129h258V0h128v129zm-4 1791V257H384v1663h1280zM1408 513v128H640V513h768zM640 1666v-128h768v128H640zm0-513v-128h768v128H640z" />
    </svg>
  ),
  displayName: 'DietPlanNotebookIcon',
});

export default DietPlanNotebookIcon;
