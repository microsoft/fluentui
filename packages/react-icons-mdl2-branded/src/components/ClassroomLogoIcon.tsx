import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const ClassroomLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M960 0q16 0 39 10t46 24 44 29 33 25q68 53 140 123t139 151 126 170 104 183 71 188 26 185q0 160-51 287t-143 216-223 140-287 58v259H896v-259q-158-7-287-57t-222-140-144-217-51-287q0-90 26-184t70-188 104-183 127-171 138-151T798 88q12-10 33-25t44-29 45-24 40-10zm-64 192q-63 45-130 107T635 433 514 587 414 752t-69 170-25 166q0 133 41 236t116 176 181 113 238 48V192zm128 524q48-3 96-17t94-38 85-54 73-66q-74-97-161-187t-187-162v524zm0 380q72 0 147-14t145-44 131-73 104-105q-26-66-60-127t-74-120q-37 39-82 73t-97 61-105 42-109 20v287zm0 565q131-7 237-47t182-113 116-175 41-238q0-35-7-62t-19-60q-50 57-114 97t-137 67-149 40-150 14v477z" />
    </svg>
  ),
  displayName: 'ClassroomLogoIcon',
});

export default ClassroomLogoIcon;
