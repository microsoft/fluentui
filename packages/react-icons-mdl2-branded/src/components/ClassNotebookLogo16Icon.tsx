import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const ClassNotebookLogo16Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M2048 384v384q0 17-5 33t-15 31q9 14 14 30t6 34v256q0 17-5 33t-15 31q9 14 14 30t6 34v384q0 27-10 50t-27 40-41 28-50 10h-128q0 27-10 50t-27 40-41 28-50 10h-384v128L0 1824V224L1280 0v128h384q27 0 50 10t40 27 28 41 10 50h128q27 0 50 10t40 27 28 41 10 50zM1039 1552V495l-226 13v319q0 158 1 320-4-5-7-11t-6-12L459 528l-219 12v968l202 11v-243-167-107-62q0-22-1-32t-1-17l366 648 233 13zm881 112v-384h-128v384h128zm0-512V896h-128v256h128zm0-384V384h-256V256h-384v896h256v128h-256v128h256v128h-256v256h384V768h256zm-512-12q-29-10-52-28t-40-41-26-52-10-59q0-40 15-75t41-61 61-41 75-15q40 0 75 15t61 41 41 61 15 75q0 30-9 58t-26 52-41 42-52 28v268h-128V756zm0-244v128h128V512h-128z" />
    </svg>
  ),
  displayName: 'ClassNotebookLogo16Icon',
});

export default ClassNotebookLogo16Icon;
