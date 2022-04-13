import * as React from 'react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Nav, INavLinkGroup } from '@fluentui/react/lib/Nav';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';

const NavBasicExample: React.FunctionComponent = () => {
  const navLinkGroups: INavLinkGroup[] = [
    {
      links: [
        {
          name: 'Foo',
          url: 'http://example.com/foo',
          key: 'key1',
        },
        {
          name: 'Bar',
          url: 'http://example.com/bar',
          key: 'key2',
        },
        {
          name: 'Baz',
          url: 'http://example.com/baz',
          key: 'key3',
        },
      ],
    },
  ];
  return <Nav groups={navLinkGroups} />;
};

export const DropdownBasicExample: React.FunctionComponent = () => {
  const options: IDropdownOption[] = [
    { key: 'a', text: 'Option A' },
    { key: 'b', text: 'Option B' },
    { key: 'c', text: 'Option C' },
  ];
  return (
    <div className="app">
      <div className="left-panel">
        <Dropdown label="Example Dropdown" options={options} />
        <NavBasicExample />
      </div>
      <div className="right-panel">
        <p>
          When pressing TAB while the Example Dropdown is open and an option has focus, the below Focusable Control
          receives focus even though the Nav menu has focusable items ordered in between.
        </p>
        <p>
          Pressing Shift+TAB from the Focusable Control demonstrates the correct behavior (moving focus back into the{' '}
          <code>&lt;Nav&gt;</code> component)
        </p>
        <p>
          Pressing TAB from the <em>collapsed</em> Dropdown control also demonstrates the correct behavior (moving focus
          forward into the <code>&lt;Nav&gt;</code> component)
        </p>
        <PrimaryButton>Focusable Control</PrimaryButton>
      </div>
    </div>
  );
};
