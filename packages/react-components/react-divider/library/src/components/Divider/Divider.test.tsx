import * as React from 'react';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { isConformant } from '../../testing/isConformant';
import { Divider } from './Divider';
import { render } from '@testing-library/react';

describe('Divider', () => {
  afterEach(() => {
    resetIdsForTests();
  });

  isConformant({
    Component: Divider,
    displayName: 'Divider',
    testOptions: {
      'has-static-classnames': [
        {
          props: { children: 'Test Children' },
        },
      ],
    },
  });

  it('renders a default divider', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a divider with content', () => {
    const { container } = render(<Divider>Default Divider</Divider>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a divider with inset', () => {
    const { container } = render(<Divider inset>Inset</Divider>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a subtle appearance', () => {
    const { container } = render(<Divider appearance="subtle">Subtle</Divider>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a brand appearance', () => {
    const { container } = render(<Divider appearance="brand">Brand</Divider>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a strong appearance', () => {
    const { container } = render(<Divider appearance="strong">Strong</Divider>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders content start aligned', () => {
    const { container } = render(<Divider alignContent="start">Start</Divider>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders content center aligned', () => {
    const { container } = render(<Divider alignContent="center">Center</Divider>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders content end aligned', () => {
    const { container } = render(<Divider alignContent="end">End</Divider>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a divider with a different color', () => {
    const { container } = render(<Divider color="#FF00FF" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a vertical divider', () => {
    const { container } = render(<Divider vertical />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a vertical divider with content', () => {
    const { container } = render(<Divider vertical>Vertical</Divider>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a vertical divider with a fixed height', () => {
    const { container } = render(
      <Divider style={{ height: 100 }} vertical>
        fixed 100px height
      </Divider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a horizontal divider with a fixed width', () => {
    const { container } = render(<Divider style={{ width: 100 }}>fixed 100px width</Divider>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
