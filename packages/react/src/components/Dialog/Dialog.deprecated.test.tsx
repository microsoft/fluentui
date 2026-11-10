import * as React from 'react';
import { render } from '@testing-library/react';

import { resetIds, setWarningCallback } from '../../Utilities';
import { DialogBase } from './Dialog.base';

jest.mock('react-dom', () => {
  return {
    ...jest.requireActual('react-dom'),
    createPortal: jest.fn((node: any) => node),
  };
});

describe('Dialog deprecated props', () => {
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const noop = () => {};
    // Prevent warn deprecations from failing test
    setWarningCallback(noop);
  });

  beforeEach(() => {
    resetIds();
  });

  afterAll(() => {
    setWarningCallback();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders Dialog with className', () => {
    const { container } = render(
      <DialogBase
        className="Dialog"
        isOpen
        dialogContentProps={{ title: 'Sample title', subText: 'Sample subtext' }}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders Dialog with containerClassName', () => {
    const { container } = render(
      <DialogBase
        containerClassName="Container"
        isOpen
        dialogContentProps={{ title: 'Sample title', subText: 'Sample subtext' }}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders Dialog with isBlocking set to true', () => {
    const { container } = render(
      <DialogBase isBlocking isOpen dialogContentProps={{ title: 'Sample title', subText: 'Sample subtext' }} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders Dialog with isDarkOverlay set to true', () => {
    const { container } = render(
      <DialogBase isDarkOverlay isOpen dialogContentProps={{ title: 'Sample title', subText: 'Sample subtext' }} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
