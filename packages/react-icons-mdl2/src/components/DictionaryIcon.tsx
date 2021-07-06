import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DictionaryIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 0v2048H256q-53 0-99-20t-82-55-55-81-20-100V256q0-49 21-95t57-82 82-57 96-22h1408zm-128 1664H256q-27 0-50 10t-40 27-28 41-10 50q0 27 10 50t27 40 41 28 50 10h1280v-256zm-1408-94q60-34 128-34h1280V128H256q-23 0-46 11t-41 30-29 41-12 46v1314zM384 384h896v384H384V384zm128 256h640V512H512v128z" />
    </svg>
  ),
  displayName: 'DictionaryIcon',
});

export default DictionaryIcon;
