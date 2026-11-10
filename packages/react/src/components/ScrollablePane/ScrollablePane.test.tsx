import * as React from 'react';
import { render } from '@testing-library/react';
import { ScrollablePane } from './ScrollablePane';

describe('ScrollablePane', () => {
  it('renders correctly', () => {
    // Trying to call MutationObserver.observe in ScrollablePane.componentDidMount on a fake node
    // causes an exception in React 17. Just mock it since it's not important for this test.
    jest.spyOn(MutationObserver.prototype, 'observe').mockImplementation();

    const { container } = render(<ScrollablePane />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
