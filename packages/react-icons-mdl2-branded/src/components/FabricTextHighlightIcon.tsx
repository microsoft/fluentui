import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const FabricTextHighlightIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M903 924v86H768V128h135v391h2q35-58 85-88t118-31q64 0 109 24t75 66 42 95 14 110v7q0 3-1 7l-309 310q-44-8-77-32t-56-63h-2zm-1-163q0 32 10 60t30 50 46 33 61 13q46 0 77-20t50-52 26-71 8-79q0-35-8-68t-26-60-46-43-68-16q-39 0-68 14t-50 39-31 57-11 69v74zm-272 249H499v-93h-3q-61 107-181 107-41 0-75-11t-59-34-39-54-14-75q0-46 14-80t39-58 62-38 79-21l177-25q0-62-29-94t-92-33q-54 0-102 19t-90 54V456q50-29 105-42t113-14q226 0 226 223v387zM499 769v-52l-125 18q-25 3-46 8t-37 17-25 29-9 47q0 43 30 64t70 22q33 0 59-12t44-33 29-49 10-59zm1402-133q0 25-10 48t-27 40l-791 790q-22-32-40-55t-37-43-42-38-56-39l791-791q36-36 88-36 25 0 48 10t39 26 27 40 10 48zm-965 999q0 33-12 61t-34 50-51 33-61 13H568q-21 0-37-16 42-19 66-57t24-84q0-32 12-62 18-43 58-69t87-27q33 0 61 12t50 34 34 50 13 62z" />
    </svg>
  ),
  displayName: 'FabricTextHighlightIcon',
});

export default FabricTextHighlightIcon;
