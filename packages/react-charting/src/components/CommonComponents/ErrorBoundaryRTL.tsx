import * as React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary, { ErrorCodes, IErrorBoundaryProps } from './ErrorBoundary';

describe('ErrorBoundary', () => {
  const renderErrorBoundary = (props: IErrorBoundaryProps) => {
    render(
      <ErrorBoundary {...props}>
        <div>Child component</div>
      </ErrorBoundary>,
    );
  };

  it('should render child component when there is no error', () => {
    renderErrorBoundary({});

    expect(screen.getByText('Child component')).toBeInTheDocument();
  });

  it('should render error state when hasErrorState prop is true', () => {
    renderErrorBoundary({ hasErrorState: true });

    expect(screen.getByText("Couldn't load data")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong and we couldn't get the page to display")).toBeInTheDocument();
    expect(screen.getByText(`Error code: ${ErrorCodes.GeneralError}`)).toBeInTheDocument();
  });

  it('should render empty state when hasEmptyState prop is true', () => {
    renderErrorBoundary({ hasEmptyState: true });

    expect(screen.getByText("Couldn't load data")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong and we couldn't get the page to display")).toBeInTheDocument();
    expect(screen.getByText(`Error code: ${ErrorCodes.NoData}`)).toBeInTheDocument();
  });

  it('should render custom error component when handleError prop is provided', () => {
    const CustomErrorComponent = () => <div>Custom error component</div>;

    renderErrorBoundary({ hasErrorState: true, handleError: CustomErrorComponent });

    expect(screen.getByText('Custom error component')).toBeInTheDocument();
  });

  it('should render custom empty state component when handleEmptyState prop is provided', () => {
    const CustomEmptyStateComponent = () => <div>Custom empty state component</div>;

    renderErrorBoundary({ hasEmptyState: true, handleEmptyState: CustomEmptyStateComponent });

    expect(screen.getByText('Custom empty state component')).toBeInTheDocument();
  });
});
