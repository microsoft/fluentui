import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const SwayLogo32Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1984 320v1408q0 26-19 45t-45 19h-704v205L64 1731V317L1216 51v205h704q26 0 45 19t19 45zM842 1194q0-59-18-99t-47-68-61-47-61-38-46-40-19-52q0-32 16-45t42-23q5 0 9-1t8-1q47 0 80 13t69 44V656q-29-13-59-18t-63-6q-21 0-42 2t-41 6q-41 8-73 29t-53 53-33 68-11 78q0 56 18 94t44 66 58 48 57 38 45 40 18 50q0 37-23 51t-55 14q-49 0-89-28t-70-65v186q23 15 43 25t42 16 44 10 51 3q103 0 161-59t59-163zm1078 534v-512h-704v128h192v64h-192v128h192v64h-192v128h704zm0-672V320h-704v565q6-5 27-24t46-39 44-37 26-17q11 0 15 7t10 14l344 363h128l-298-288q6-7 16-20t21-26 23-23 20-10q7 0 13 3t12 8l257 260zm-64 288v64h-384v-64h384zm-104-738q-30 0-51-21t-21-51q0-29 22-50t50-21q29 0 50 21t21 50q0 29-21 50t-50 22zm104 930v64h-384v-64h384z" />
    </svg>
  ),
  displayName: 'SwayLogo32Icon',
});

export default SwayLogo32Icon;
