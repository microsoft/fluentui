import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const StoreLogoMed20Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1946 512v1285q0 31-12 58t-32 47-47 32-58 12H148q-30 0-57-11t-47-32-32-48-12-58V512h512v-51q0-95 36-179t99-146 147-99T973 0q95 0 179 36t146 99 99 147 37 179v51h110q-2-17-4-32t-4-29q-2-71-19-135t-49-123q143 100 158 319h320zm-1332 0h115q8-87 42-158t91-123q50-26 111-26 37 0 73 11-97 32-159 110t-75 186h519v-51q0-74-28-139t-77-114-114-77-139-29q-74 0-139 28t-115 77-77 114-28 140v51zm308 717H512v409h410v-409zm0-512H512v409h410V717zm512 512h-410v409h410v-409zm0-512h-410v409h410V717z" />
    </svg>
  ),
  displayName: 'StoreLogoMed20Icon',
});

export default StoreLogoMed20Icon;
