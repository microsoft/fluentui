import { render } from '@testing-library/react';
import * as React from 'react';

import { AriaLiveAnnouncer } from './AriaLiveAnnouncer';

describe('AriaLiveAnnouncer', () => {
  it('renders a default state', () => {
    const result = render(<AriaLiveAnnouncer>Default AriaLive</AriaLiveAnnouncer>);

    expect(result.container).toMatchSnapshot();
  });
});
