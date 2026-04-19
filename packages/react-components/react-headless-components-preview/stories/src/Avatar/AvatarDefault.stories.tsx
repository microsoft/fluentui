import * as React from 'react';
import { Avatar } from '@fluentui/react-headless-components-preview';

export const Default = (): React.ReactNode => (
  <div className="flex items-center gap-4 flex-wrap">
    <Avatar
      name="Alice Johnson"
      className="inline-flex items-center justify-center rounded-full text-sm font-semibold text-white select-none overflow-hidden shrink-0 size-10 bg-gray-900"
    />

    <Avatar
      className="size-10 rounded-full overflow-hidden relative"
      name="Katri Athokas"
      initials={{ className: 'absolute inset-0 flex items-center justify-center' }}
      image={{
        className: 'absolute inset-0 object-cover',
        src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg',
      }}
    />
  </div>
);
