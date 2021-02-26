import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const OfficeAssistantLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1604 1254q79 0 148 30t120 82 82 121 30 148q0 78-30 147t-81 121-121 82-148 30q-78 0-147-30t-121-81-82-121-30-148q0-79 30-148t81-121 121-82 148-30zm-2 165q-20 0-36 9t-28 23-18 33-7 37q0 19 6 37t18 32 28 23 37 9q20 0 36-8t27-23 18-33 7-37q0-18-6-36t-18-33-28-24-36-9zm181 425q0-28-1-63t-10-67-30-52-61-22h-5q-14 15-33 24t-40 10q-20 0-39-9t-33-25q-41 0-63 20t-32 51-11 67-1 66h359zm-205-652q-88 5-164 41t-133 97-88 138-33 167q0 89 35 173l-147 45-971-350 974 117V329L403 481v873L64 1501V390l985-357 529 171v988z" />
    </svg>
  ),
  displayName: 'OfficeAssistantLogoIcon',
});

export default OfficeAssistantLogoIcon;
