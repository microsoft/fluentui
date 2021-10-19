import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Blocked12Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M939 171q129 0 249 33t224 95 190 146 147 190 94 225 34 249q0 129-33 249t-95 224-146 191-190 147-225 94-249 34q-130 0-250-33t-224-95-190-147-147-190-94-224-34-250q0-129 33-249t95-224 147-190 190-147 224-94 250-34zm0 1740q111 0 213-28t192-81 162-126 125-162 81-191 29-214q0-110-28-212t-81-192-126-162-163-126-191-81-213-29q-111 0-213 28t-192 81-162 126-125 162-81 191-29 214q0 111 28 213t81 192 125 162 163 126 191 80 214 29zm-470-887h939v171H469v-171z" />
    </svg>
  ),
  displayName: 'Blocked12Icon',
});

export default Blocked12Icon;
