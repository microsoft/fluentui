import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ContactIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1330 1203q136 47 245 131t186 196 118 243 41 275h-128q0-164-58-304t-162-244-243-161-305-59q-107 0-206 27t-184 76-155 119-119 155-77 185-27 206H128q0-144 42-275t119-242 186-194 245-133q-78-42-140-102T475 969t-67-157-24-172q0-133 50-249t137-204T774 50t250-50q133 0 249 50t204 137 137 203 50 250q0 88-23 171t-67 156-105 133-139 103zM512 640q0 106 40 199t110 162 163 110 199 41q106 0 199-40t162-110 110-163 41-199q0-106-40-199t-110-162-163-110-199-41q-106 0-199 40T663 278 553 441t-41 199z" />
    </svg>
  ),
  displayName: 'ContactIcon',
});

export default ContactIcon;
