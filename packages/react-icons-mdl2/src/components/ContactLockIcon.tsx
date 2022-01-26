import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ContactLockIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1357 1051q-20 26-34 55t-24 62q-86-70-189-107t-214-37q-88 0-170 23t-153 64-129 100-100 130-65 153-23 170H128q0-120 35-231t101-205 156-167 204-115q-56-35-100-82t-76-104-47-119-17-129q0-106 40-199t110-162T697 41 896 0q106 0 199 40t162 110 110 163 41 199q0 66-16 129t-48 119-76 103-101 83q104 40 190 105zM512 512q0 80 30 149t82 122 122 83 150 30q79 0 149-30t122-82 83-122 30-150q0-79-30-149t-82-122-123-83-149-30q-80 0-149 30t-122 82-83 123-30 149zm1536 896v640h-768v-640h128v-128q0-53 20-99t55-82 81-55 100-20q53 0 99 20t82 55 55 81 20 100v128h128zm-512 0h256v-128q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50v128zm384 128h-512v384h512v-384z" />
    </svg>
  ),
  displayName: 'ContactLockIcon',
});

export default ContactLockIcon;
