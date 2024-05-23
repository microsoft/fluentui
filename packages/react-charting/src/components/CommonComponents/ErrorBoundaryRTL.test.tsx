import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ErrorCodes } from './ErrorBoundary.base';
import { IErrorBoundaryProps } from './ErrorBoundary.types';
import { ErrorBoundary } from './ErrorBoundary';

describe('ErrorBoundary', () => {
  const renderErrorBoundary = (props: IErrorBoundaryProps) => {
    render(
      <ErrorBoundary {...props}>
        <div>Child component</div>
      </ErrorBoundary>,
    );
  };

  it('should render child component when there is no error', () => {
    renderErrorBoundary({ hasEmptyState: false });

    expect(screen.getByText('Child component')).toBeInTheDocument();
  });

  it('should render empty state when hasEmptyState prop is true', () => {
    renderErrorBoundary({ hasEmptyState: true });

    expect(screen.getByText("Couldn't load data")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong and we couldn't get the page to display")).toBeInTheDocument();
    expect(screen.getByText(`Error code: ${ErrorCodes.NoData}`)).toBeInTheDocument();
  });

  it('should render custom error message when an error is thrown', () => {
    const ThrowError = () => {
      const [count, setCount] = React.useState(0);
      if (count > 1) {
        throw new Error('Test');
      }
      return (
        <div>
          <p>count: {count}</p>
          <button onClick={() => setCount(count + 1)}>increment</button>
        </div>
      );
    };
    const CustomErrorComponent = () => <div>Custom error component</div>;
    const props = { hasEmptyState: false, handleError: CustomErrorComponent };
    render(
      <ErrorBoundary {...props}>
        <ThrowError />
      </ErrorBoundary>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'increment' }));
    fireEvent.click(screen.getByRole('button', { name: 'increment' }));
    expect(screen.queryByText('Custom error component')).toBeInTheDocument();
  });

  it('should render custom empty state component when handleEmptyState prop is provided', () => {
    const CustomEmptyStateComponent = () => <div>Custom empty state component</div>;

    renderErrorBoundary({ hasEmptyState: true, handleEmptyState: CustomEmptyStateComponent });

    expect(screen.getByText('Custom empty state component')).toBeInTheDocument();
  });

  it('should render custom error message when customErrorMsg prop is provided', () => {
    renderErrorBoundary({ hasEmptyState: true, customErrorMsg: 'Custom error message' });

    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });
});
