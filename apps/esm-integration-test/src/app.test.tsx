import { render } from '@testing-library/react';
import { App } from './app';

describe('App', () => {
  it('renders the component without errors', () => {
    const { getByText } = render(<App />);
    expect(getByText('Hello')).toBeInTheDocument();
  });
});
