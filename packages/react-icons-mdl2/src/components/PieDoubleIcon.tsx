import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PieDoubleIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 128q58 0 113 3t110 11 107 23 108 38q133 57 241 148t185 206 118 251 42 280q0 133-34 255t-96 230-150 194-195 150-229 97-256 34q-195 0-368-72t-311-209l-45-45 660-661V128zm64 1792q115 0 221-30t198-84 169-130 130-168 84-199 30-221q0-108-27-209t-76-191-119-165-155-132-184-90-207-43v857l-605 605q114 98 252 149t289 51zM896 896H0q0-124 32-238t90-214 140-181 181-140 214-91T896 0v896zM768 138q-121 21-226 76T353 353 215 541t-77 227h630V138zm96 886l-624 624q-118-128-179-289T0 1024h864zm-726 128q13 81 41 157t73 146l303-303H138z" />
    </svg>
  ),
  displayName: 'PieDoubleIcon',
});

export default PieDoubleIcon;
