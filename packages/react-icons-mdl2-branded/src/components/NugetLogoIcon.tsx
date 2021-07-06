import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const NugetLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1467 256q121 0 226 45t185 125 124 185 46 227v628q0 121-45 227t-125 185-184 124-227 46H838q-121 0-227-45t-184-125-124-185-46-227V838q0-121 45-227t124-185 185-124 227-46h629zM715 996q45 0 84-17t69-46 47-69 17-85q0-45-17-84t-46-69-69-47-85-17q-45 0-84 17t-69 46-47 69-17 85q0 45 17 84t46 69 69 47 85 17zm693 846q78 0 146-29t120-81 80-119 30-147q0-78-29-146t-81-120-119-80-147-30q-78 0-146 29t-120 81-80 119-30 147q0 78 29 146t81 120 119 80 147 30zM384 192q0 40-15 75t-41 61-61 41-75 15q-40 0-75-15t-61-41-41-61-15-75q0-40 15-75t41-61 61-41 75-15q40 0 75 15t61 41 41 61 15 75z" />
    </svg>
  ),
  displayName: 'NugetLogoIcon',
});

export default NugetLogoIcon;
