import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SaveTemplateIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 512v128H128V512h128zm0 256v128H128V768h128zm0 256v128H128v-128h128zm0 256v128H128v-128h128zm0 256v128H128v-128h128zm-128 256h128v128H128v-128zm128 256v-128h128v128H256zm256 0v-128h128v128H512zM256 128H128V0h128v128zM512 0v128H384V0h128zm256 0v128H640V0h128zm256 0v128H896V0h128zm256 0v128h-128V0h128zm256 0v128h-128V0h128zm128 256h-128V128h128v128zm-128 256V384h128v128h-128zM256 256v128H128V256h128zm1664 512q26 0 49 10t41 27 28 41 10 50v1152H933l-165-165V896q0-26 10-49t27-41 41-28 50-10h1024zm-768 128v384h512V896h-512zm512 1024v-256h-512v256h128v-128h128v128h256zm256 0V896h-128v512h-768V896H896v933l91 91h37v-384h768v384h128z" />
    </svg>
  ),
  displayName: 'SaveTemplateIcon',
});

export default SaveTemplateIcon;
