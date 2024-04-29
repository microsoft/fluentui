import * as React from 'react';
import { Avatar } from '@fluentui/react-northstar';
import { AcceptIcon } from '@fluentui/react-icons-northstar';

const status = { color: 'green', icon: <AcceptIcon />, title: 'Available' };

const AvatarUsageExampleShorthand = () => (
  <div>
    Correct:
    <div>
      <div style={{ backgroundColor: 'violet', padding: '1rem', display: 'inline-block' }}>
        <Avatar name="Cecil Folk (Software Developer)" status={status} variables={{ statusBorderColor: 'violet' }} />
      </div>
      <div style={{ backgroundColor: 'yellowgreen', padding: '1rem', display: 'inline-block' }}>
        <Avatar
          name="Cecil Folk (Software Developer)"
          status={status}
          variables={{ statusBorderColor: 'yellowgreen' }}
        />
      </div>
      <div style={{ backgroundColor: 'orangered', padding: '1rem', display: 'inline-block' }}>
        <Avatar name="Cecil Folk (Software Developer)" status={status} variables={{ statusBorderColor: 'orangered' }} />
      </div>
      <div style={{ backgroundColor: 'cornflowerblue', padding: '1rem', display: 'inline-block' }}>
        <Avatar
          name="Cecil Folk (Software Developer)"
          status={status}
          variables={{ statusBorderColor: 'cornflowerblue' }}
        />
      </div>
    </div>
    Incorrect (Border should not be visible, unless in Contrast theme):
    <div>
      <div style={{ backgroundColor: 'violet', padding: '1rem', display: 'inline-block' }}>
        <Avatar name="Cecil Folk (Software Developer)" status={status} />
      </div>
      <div style={{ backgroundColor: 'yellowgreen', padding: '1rem', display: 'inline-block' }}>
        <Avatar name="Cecil Folk (Software Developer)" status={status} />
      </div>
      <div style={{ backgroundColor: 'orangered', padding: '1rem', display: 'inline-block' }}>
        <Avatar name="Cecil Folk (Software Developer)" status={status} />
      </div>
      <div style={{ backgroundColor: 'cornflowerblue', padding: '1rem', display: 'inline-block' }}>
        <Avatar name="Cecil Folk (Software Developer)" status={status} />
      </div>
    </div>
  </div>
);

export default AvatarUsageExampleShorthand;
