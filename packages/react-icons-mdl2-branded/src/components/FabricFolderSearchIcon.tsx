import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const FabricFolderSearchIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M2048 512v383q-28-28-60-50t-68-42V512h-704q-56 0-90 9t-58 24-41 31-37 31-50 23-76 10H128v896h896v128H128q-27 0-50-10t-40-27-28-41-10-50V256q0-27 10-50t27-40 41-28 50-10h736q37 0 69 13t58 36 49 51 39 59q13 23 25 41t28 30 35 19 49 7h704q27 0 50 10t40 27 28 41 10 50zm-1184 0q27 0 45-9t35-22 34-28 39-28q-15-17-31-45t-36-56-40-48-46-20H128v256h736zm800 384q79 0 149 30t122 82 83 123 30 149q0 80-30 149t-82 122-123 83-149 30q-60 0-116-18t-106-54l-437 437q-19 19-45 19t-45-19-19-45q0-26 19-45l437-437q-35-49-53-105t-19-117q0-79 30-149t82-122 122-83 150-30zm0 640q53 0 99-20t82-55 55-81 20-100q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100q0 53 20 99t55 82 81 55 100 20z" />
    </svg>
  ),
  displayName: 'FabricFolderSearchIcon',
});

export default FabricFolderSearchIcon;
