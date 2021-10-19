import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PDFIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 1664h-128v384H128v-384H0V640h128V0h1243l421 421v219h128v1024zM1408 384h165l-165-165v165zM256 640h1408V512h-384V128H256v512zm1408 1024H256v256h1408v-256zm128-896H128v768h1664V768zM448 896q40 0 75 15t61 41 41 61 15 75q0 40-15 75t-41 61-61 41-75 15h-64v128H256V896h192zm0 256q26 0 45-19t19-45q0-26-19-45t-45-19h-64v128h64zm448-256q53 0 99 20t82 55 55 81 20 100q0 53-20 99t-55 82-81 55-100 20H768V896h128zm0 384q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10v256zm384-384h320v128h-192v128h192v128h-192v128h-128V896z" />
    </svg>
  ),
  displayName: 'PDFIcon',
});

export default PDFIcon;
