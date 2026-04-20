import * as React from 'react';
import { SearchBox } from '@fluentui/react-headless-components-preview';
import { SearchRegular } from '@fluentui/react-icons';

export const Default = (): React.ReactNode => (
  <SearchBox
    placeholder="Search..."
    className="flex w-full max-w-sm items-center rounded-md border border-gray-300 bg-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-black has-[:focus-visible]:ring-offset-2"
    contentBefore={<SearchRegular className="ml-3 h-4 w-4 shrink-0 text-gray-400" />}
    input={{
      className: 'flex-1 px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 bg-transparent',
    }}
  />
);
