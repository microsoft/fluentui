import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PinnedIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1990 748q-33 33-64 60t-65 47-73 29-90 11q-34 0-65-6l-379 379q13 38 19 78t6 80q0 65-13 118t-37 100-60 89-79 87l-386-386-568 569-136 45 45-136 569-568-386-386 45-45q70-70 160-107t190-37q82 0 157 25l379-379q-6-31-6-65 0-49 10-88t30-74 46-65 61-65l690 690zm-292 19q55 0 104-26l-495-495q-26 49-26 104 0 28 6 52t15 51L810 944q-25-10-47-19t-44-15-45-9-51-4q-57 0-110 16t-100 49l673 673q32-46 49-99t17-110q0-27-3-50t-10-46-16-45-19-47l491-492q26 8 50 14t53 7z" />
    </svg>
  ),
  displayName: 'PinnedIcon',
});

export default PinnedIcon;
