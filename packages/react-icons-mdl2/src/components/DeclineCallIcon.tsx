import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DeclineCallIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 512q75 0 159 8t171 25 171 44 164 64 145 86 119 109q43 51 69 111t26 129v128q0 40-15 75t-41 61-61 41-75 15h-256q-40 0-75-15t-61-41-41-61-15-75v-128q0-26-19-45t-45-19H704q-26 0-45 19t-19 45v128q0 40-15 75t-41 61-61 41-75 15H192q-40 0-75-15t-61-41-41-61-15-75v-128q0-68 26-128t69-112q51-60 118-108t146-86 163-64 172-44 170-26 160-8zm896 576q0-52-25-98t-63-85-85-69-87-53q-70-37-148-64t-161-44-165-26-162-9q-79 0-162 8t-165 26-160 45-149 64q-41 22-87 52t-84 69-64 85-25 99v128q0 26 19 45t45 19h256q26 0 45-19t19-45v-128q0-40 15-75t41-61 61-41 75-15h640q40 0 75 15t61 41 41 61 15 75v128q0 26 19 45t45 19h256q26 0 45-19t19-45v-128z" />
    </svg>
  ),
  displayName: 'DeclineCallIcon',
});

export default DeclineCallIcon;
