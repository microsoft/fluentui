import '@testing-library/jest-dom';
import * as React from 'react';
import { print, test } from './index';
import { render } from '@testing-library/react'; // (or /dom, /vue, ...)
import { makeStyles, ax } from '@fluentui/react-make-styles';
import * as renderer from 'react-test-renderer';

const useStyles1 = makeStyles({
  paddingLeft: {
    paddingLeft: '10px',
  },
});
const useStyles2 = makeStyles({
  paddingRight: {
    paddingRight: '20px',
  },
});
const useStyles3 = makeStyles({
  display: {
    display: 'none',
  },
});

const Test = () => {
  const styles1 = useStyles1();
  const styles2 = useStyles2();
  const styles3 = useStyles3();
  return (
    <div
      data-testid="test"
      className={ax('static-class', styles1.paddingLeft, styles2.paddingRight, styles3.display)}
    />
  );
};

describe('jest-serializer-make-styles', () => {
  it('should check styles', () => {
    expect(render(<Test />).getByTestId('test')).toHaveStyle({
      display: 'none',
      paddingLeft: '10px',
      paddingRight: '20px',
    });
  });

  it('renders a default state', () => {
    const component = renderer.create(<Test />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

expect.addSnapshotSerializer({ print, test });
