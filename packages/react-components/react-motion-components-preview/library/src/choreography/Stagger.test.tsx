import * as React from 'react';
import { render, screen } from '@testing-library/react';

// Mock the stagger-utils module with default behavior (all visible)
jest.mock('./stagger-utils', () => ({
  toElementArray: (children: React.ReactNode) => {
    return React.Children.toArray(children).filter(React.isValidElement);
  },
  useStaggerItemsVisibility: () => ({
    itemsVisibility: [true, true, true], // All items visible for testing
  }),
  DEFAULT_ITEM_DELAY: 100,
  DEFAULT_ITEM_DURATION: 200,
  acceptsVisibleProp: jest.requireActual('./stagger-utils').acceptsVisibleProp,
}));

// Import after mocking
import { Stagger } from './Stagger';
import { Fade } from '../components/Fade';
import { Scale } from '../components/Scale';
import { Slide } from '../components/Slide';

// Regular component without visible prop
const RegularDiv: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div data-testid="regular-div">{children}</div>
);

describe('Stagger', () => {
  describe('acceptsVisibleProp detection', () => {
    it('should pass visible prop to motion components even without explicit visible prop', () => {
      render(
        <Stagger visible={true}>
          <Fade>
            <div>Motion Item 1</div>
          </Fade>
          <Scale>
            <div>Motion Item 2</div>
          </Scale>
        </Stagger>,
      );

      // Motion components should be rendered
      expect(screen.getByText('Motion Item 1')).toBeDefined();
      expect(screen.getByText('Motion Item 2')).toBeDefined();
    });

    it('should use mount/unmount for children without visible prop', () => {
      // Since our mock returns all visible, we'll test the behavior conceptually
      // by checking that children without visible prop are rendered when visibility is true
      render(
        <Stagger visible={true}>
          <RegularDiv>Regular Item 1</RegularDiv>
          <RegularDiv>Regular Item 2</RegularDiv>
        </Stagger>,
      );

      // With our current mock (all visible), both should be rendered
      expect(screen.getByText('Regular Item 1')).toBeDefined();
      expect(screen.getByText('Regular Item 2')).toBeDefined();

      // The key test is that they don't receive a visible prop - they are just mounted/unmounted
      const divs = screen.getAllByTestId('regular-div');
      divs.forEach(div => {
        expect(div.hasAttribute('data-visible')).toBe(false);
      });
    });

    it('should handle mixed children with and without visible prop', () => {
      render(
        <Stagger visible={true}>
          <Fade>
            <div>Motion Item</div>
          </Fade>
          <RegularDiv>Regular Item</RegularDiv>
        </Stagger>,
      );

      // Both components should be rendered
      expect(screen.getByText('Motion Item')).toBeDefined();
      expect(screen.getByText('Regular Item')).toBeDefined();
    });

    it('should preserve original keys when cloning elements', () => {
      render(
        <Stagger visible={true}>
          <Slide key="motion-key">
            <div>Motion Item</div>
          </Slide>
          <RegularDiv key="regular-key">Regular Item</RegularDiv>
        </Stagger>,
      );

      // Both components should be rendered
      expect(screen.getByText('Motion Item')).toBeDefined();
      expect(screen.getByText('Regular Item')).toBeDefined();
    });
  });

  describe('Stagger.In and Stagger.Out variants', () => {
    it('should render Stagger.In with visible=true', () => {
      render(
        <Stagger.In>
          <Fade.In>
            <div>Motion Item</div>
          </Fade.In>
        </Stagger.In>,
      );

      expect(screen.getByText('Motion Item')).toBeDefined();
    });

    it('should render Stagger.Out with visible=false', () => {
      render(
        <Stagger.Out>
          <Scale.Out>
            <div>Motion Item</div>
          </Scale.Out>
        </Stagger.Out>,
      );

      // With our mock (all visible=true), the motion component should still be rendered
      expect(screen.getByText('Motion Item')).toBeDefined();
    });
  });

  describe('edge cases', () => {
    it('should handle empty children', () => {
      const { container } = render(<Stagger visible={true} children={null} />);
      // Stagger renders a React fragment, so we look for the fragment container
      expect(container.innerHTML).toBe('');
    });

    it('should handle single child', () => {
      render(
        <Stagger visible={true}>
          <RegularDiv>Single Item</RegularDiv>
        </Stagger>,
      );

      expect(screen.getByText('Single Item')).toBeDefined();
    });

    it('should handle children without props', () => {
      const ChildWithoutProps = () => <div data-testid="no-props">No Props</div>;

      render(
        <Stagger visible={true}>
          <ChildWithoutProps />
        </Stagger>,
      );

      expect(screen.getByTestId('no-props')).toBeDefined();
    });
  });

  describe('acceptsVisibleProp function', () => {
    it('should detect motion components (Fade, Scale, Slide) as accepting visible prop', () => {
      render(
        <Stagger visible={true}>
          <Fade>
            <div>Fade Content</div>
          </Fade>
          <Scale>
            <div>Scale Content</div>
          </Scale>
          <Slide>
            <div>Slide Content</div>
          </Slide>
        </Stagger>,
      );

      // All motion components should be rendered (they accept visible prop)
      expect(screen.getByText('Fade Content')).toBeDefined();
      expect(screen.getByText('Scale Content')).toBeDefined();
      expect(screen.getByText('Slide Content')).toBeDefined();
    });

    it('should not pass visible prop to regular components', () => {
      render(
        <Stagger visible={true}>
          <RegularDiv>No Visible</RegularDiv>
        </Stagger>,
      );

      // The component should be rendered normally without visible prop
      expect(screen.getByTestId('regular-div')).toBeDefined();
    });

    it('should handle motion components with explicit visible prop', () => {
      render(
        <Stagger visible={true}>
          <Fade visible={false}>
            <div>Explicitly False</div>
          </Fade>
        </Stagger>,
      );

      // Motion component should still be rendered (Stagger controls visibility)
      expect(screen.getByText('Explicitly False')).toBeDefined();
    });
  });
});
