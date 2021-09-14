import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { resetIdsForTests } from '@fluentui/react-utilities';
// TODO: Find a way to use pointer events with testing-library and remove enzyme.
import { RangedSlider } from './RangedSlider';
import { isConformant } from '../../common/isConformant';

describe('RangedSlider', () => {
  isConformant({
    Component: RangedSlider,
    displayName: 'RangedSlider',
    disabledTests: ['kebab-aria-attributes'],
  });

  afterEach(() => {
    resetIdsForTests();
  });

  describe('Snapshot Tests', () => {
    it('renders horizontal RangedSlider correctly', () => {
      const { container } = render(<RangedSlider defaultValue={{ lowerValue: 5, upperValue: 7 }} min={0} max={10} />);
      expect(container).toMatchSnapshot();
    });

    it('renders vertical RangedSlider correctly', () => {
      const { container } = render(<RangedSlider defaultValue={{ lowerValue: 2, upperValue: 8 }} vertical />);
      expect(container).toMatchSnapshot();
    });

    it('renders disabled RangedSlider correctly', () => {
      const { container } = render(<RangedSlider disabled min={0} max={10} />);
      expect(container).toMatchSnapshot();
    });

    it('renders RangedSlider with marks correctly', () => {
      const { container } = render(<RangedSlider marks={true} step={3} />);
      expect(container).toMatchSnapshot();
    });

    it('renders horizontal Slider with (custom marks) correctly', () => {
      const { container } = render(<RangedSlider marks={[1, 3, 7, 8]} />);
      expect(container).toMatchSnapshot();
    });

    it('renders vertical Slider with (custom marks) correctly', () => {
      const { container } = render(<RangedSlider marks={[2, 5, 9, 18]} vertical />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('Unit Tests', () => {
    it('handles id prop', () => {
      render(<RangedSlider id="test_id" data-testid="test" />);
      const sliderRoot = screen.getByTestId('test');
      expect(sliderRoot.getAttribute('id')).toEqual('test_id');
    });
  });
});
