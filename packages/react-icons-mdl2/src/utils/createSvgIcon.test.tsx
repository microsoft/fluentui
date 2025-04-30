import * as React from 'react';
import { render } from '@testing-library/react';
import createSvgIcon from './createSvgIcon';

const testSvg = () => <svg />;

describe('createSvgIcon', () => {
  it('returns a valid React component', () => {
    const TestIcon = createSvgIcon({ svg: testSvg, displayName: 'TestIcon' });
    expect(React.isValidElement(<TestIcon />)).toEqual(true);
  });

  it('sets displayName to the created Component', () => {
    const TestIcon = createSvgIcon({ svg: testSvg, displayName: 'TestIcon' });
    expect(TestIcon.displayName).toEqual('TestIcon');
  });

  it('spreads unhandled props on the root element', () => {
    const TestIcon = createSvgIcon({ svg: testSvg, displayName: 'TestIcon' });

    const wrapper = render(<TestIcon id="test-id" data-bar="data-test-value" />);

    expect(wrapper.container.querySelector('span')?.getAttribute('data-bar')).toEqual('data-test-value');
    expect(wrapper.container.querySelector('span')?.getAttribute('id')).toEqual('test-id');
  });

  it("merged user's className on the root element with the generated", () => {
    const TestIcon = createSvgIcon({ svg: testSvg, displayName: 'TestIcon' });

    const wrapper = render(<TestIcon className="test-className" />);

    expect(wrapper.container.querySelector('span')?.className!.includes('test-className')).toEqual(true);
  });

  it('provides all props on the svg function', () => {
    interface IBookProps {
      foo: boolean;
    }

    const BookIcon = createSvgIcon<IBookProps>({
      svg: ({ props }) => <svg data-foo={props.foo.toString()} />,
      displayName: 'BookIcon',
    });

    const wrapper = render(<BookIcon foo />);

    expect(wrapper.container.querySelector('svg')?.getAttribute('data-foo')).toEqual('true');
  });
});
