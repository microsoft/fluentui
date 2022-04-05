import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MailScheduleIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M960 1100L128 565v971h768v128H0V384h1920v601q-13-9-29-19t-33-20-34-18-32-13V565l-832 535zm678-588H282l678 436 678-436zm410 1024q0 106-40 199t-109 163-163 110-200 40q-106 0-199-40t-163-109-110-163-40-200q0-106 40-199t109-163 163-110 200-40q106 0 199 40t163 109 110 163 40 200zm-512 384q79 0 149-30t122-82 83-122 30-150q0-79-30-149t-82-122-123-83-149-30q-80 0-149 30t-122 82-83 123-30 149q0 80 30 149t82 122 122 83 150 30zm0-640v256h192v128h-320v-384h128z" />
    </svg>
  ),
  displayName: 'MailScheduleIcon',
});

export default MailScheduleIcon;
