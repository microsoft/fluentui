import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const HexaditeInvestigationIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1407 804q-35 19-67 41t-60 50v-16l-256-146-256 146v290l256 146 98-56q0 5-1 10t-1 11q0 30 4 60t12 59l-112 64-384-220V805l384-220 383 219zM256 586v876l579 330q-25 26-45 47t-35 55l-627-358V512L1024 0l896 512v291q-61-34-128-50V586l-768-439-768 439zm1408 310q79 0 149 30t122 82 83 123 30 149q0 80-30 149t-82 122-123 83-149 30q-60 0-117-18t-105-53l-437 436q-19 19-45 19t-45-19-19-45q0-26 19-45l436-437q-35-48-53-105t-18-117q0-79 30-149t82-122 122-83 150-30zm0 640q53 0 99-20t82-55 55-81 20-100q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100q0 53 20 99t55 82 81 55 100 20z" />
    </svg>
  ),
  displayName: 'HexaditeInvestigationIcon',
});

export default HexaditeInvestigationIcon;
