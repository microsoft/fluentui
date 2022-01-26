import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PasteIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 768v1280H896v-128H128V256h512q0-52 20-99t55-81 81-55T896 0q52 0 99 20t81 55 55 82 21 99h512v512h256zM512 384v128h768V384h-256v-33q0-17 1-36 0-34-3-67t-17-60-39-43-70-17q-44 0-69 16t-39 43-17 60-4 68v35q0 17 1 34H512zm384 1408V768h640V384h-128v256H384V384H256v1408h640zm896-896h-768v1024h768V896z" />
    </svg>
  ),
  displayName: 'PasteIcon',
});

export default PasteIcon;
