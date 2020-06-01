import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { setWarningCallback } from '../../Utilities';
import { DialogBase } from './Dialog.base';

// tslint:disable:deprecation

describe('Dialog deprecated props', () => {
  beforeAll(() => {
    // Prevent warn deprecations from failing test
    setWarningCallback(() => {
      /* no-op */
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders Dialog with className', () => {
    const component = renderer.create(
      <DialogBase className="Dialog" dialogContentProps={{ title: 'Sample title', subText: 'Sample subtext' }} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Dialog with containerClassName', () => {
    const component = renderer.create(
      <DialogBase
        containerClassName="Container"
        dialogContentProps={{ title: 'Sample title', subText: 'Sample subtext' }}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Dialog with isBlocking set to true', () => {
    const component = renderer.create(
      <DialogBase isBlocking dialogContentProps={{ title: 'Sample title', subText: 'Sample subtext' }} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Dialog with isDarkOverlay set to true', () => {
    const component = renderer.create(
      <DialogBase isDarkOverlay dialogContentProps={{ title: 'Sample title', subText: 'Sample subtext' }} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
