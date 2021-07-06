import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DatabaseIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M960 128q72 0 159 8t175 27 167 54 133 85q31 29 50 66t20 80v1152q0 45-19 80t-51 66q-52 51-131 84t-168 54-177 28-158 8q-72 0-159-8t-175-27-167-54-133-85q-31-29-50-66t-20-80V448q0-45 19-80t51-66q52-51 131-84t168-54 177-28 158-8zm0 128q-51 0-106 3t-112 12-109 22-102 33q-15 6-40 18t-49 29-41 35-17 40q0 8 3 15t8 14q21 32 60 56t89 42 106 30 111 20 107 11 92 4q40 0 91-3t107-11 112-20 105-31 89-42 61-56q5-7 8-14t3-15q0-20-17-39t-41-36-49-28-40-19q-48-19-101-32t-110-22-111-12-107-4zm0 1536q51 0 106-3t112-12 109-22 102-33q15-6 40-18t49-29 41-35 17-40V638q-57 37-129 62t-149 40-155 21-143 7q-66 0-143-6t-155-22-149-40-129-62v962q0 20 17 39t41 36 49 28 40 19q48 20 101 33t110 21 111 12 107 4z" />
    </svg>
  ),
  displayName: 'DatabaseIcon',
});

export default DatabaseIcon;
