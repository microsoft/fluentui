import * as React from 'react';
import { render } from '@testing-library/react';
import { Calendar } from './Calendar';

describe('Calendar', () => {
  it('renders', () => {
    render(<Calendar />);
  });
});
