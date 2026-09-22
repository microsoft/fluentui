import * as React from 'react';
import { render } from '@testing-library/react';
import { TabList } from '../TabList';
import { Tab } from './Tab';
import { tabClassNames, tabReservedSpaceClassNames } from './useTabStyles.styles';

describe('Tab', () => {
  it('renders stable classes and preserves consumer classes', () => {
    const { getByRole, getByText } = render(
      <TabList>
        <Tab className="custom-root" content={{ className: 'custom-content' }} value="tab">
          Tab
        </Tab>
      </TabList>,
    );
    const tab = getByRole('tab');

    expect(tab).toHaveClass(tabClassNames.root, 'custom-root');
    expect(
      getByText('Tab', { selector: `.${tabClassNames.content}:not(.${tabReservedSpaceClassNames.content})` }),
    ).toHaveClass(tabClassNames.content, 'custom-content');
  });

  it('reserves label space for an unselected tab by default', () => {
    const { container } = render(
      <TabList selectedValue="selected">
        <Tab value="tab">Tab</Tab>
      </TabList>,
    );

    expect(container.querySelector(`.${tabReservedSpaceClassNames.content}`)).toBeInTheDocument();
  });

  it('does not reserve label space when disabled by the list', () => {
    const { container } = render(
      <TabList reserveSelectedTabSpace={false}>
        <Tab value="tab">Tab</Tab>
      </TabList>,
    );

    expect(container.querySelector(`.${tabReservedSpaceClassNames.content}`)).not.toBeInTheDocument();
  });
});
