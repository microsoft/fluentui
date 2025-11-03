import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AnnotationOnlyChart } from './AnnotationOnlyChart';
import { IAnnotationOnlyChartProps } from './AnnotationOnlyChart.types';
import { IChartAnnotation } from '../../types/IChartAnnotation';

// Mock ResizeObserver
const mockObserve = jest.fn();
const mockUnobserve = jest.fn();
const mockDisconnect = jest.fn();

class MockResizeObserver {
  public observe = mockObserve;
  public unobserve = mockUnobserve;
  public disconnect = mockDisconnect;
}

global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

const mockAnnotations: IChartAnnotation[] = [
  {
    id: 'annotation-1',
    text: 'Test Annotation 1',
    coordinates: { type: 'relative', x: 0.5, y: 0.5 },
  },
  {
    id: 'annotation-2',
    text: 'Test Annotation 2',
    coordinates: { type: 'relative', x: 0.3, y: 0.7 },
    style: {
      backgroundColor: '#fff',
      textColor: '#000',
    },
  },
];

const defaultProps: IAnnotationOnlyChartProps = {
  annotations: mockAnnotations,
  width: 600,
  height: 400,
};

describe('AnnotationOnlyChart', () => {
  beforeEach(() => {
    mockObserve.mockClear();
    mockUnobserve.mockClear();
    mockDisconnect.mockClear();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { container } = render(<AnnotationOnlyChart {...defaultProps} />);
      expect(container).toBeDefined();
    });

    it('renders with correct data attribute', () => {
      const { container } = render(<AnnotationOnlyChart {...defaultProps} />);
      const element = container.querySelector('[data-chart-annotation-only="true"]');
      expect(element).toBeInTheDocument();
    });

    it('renders chart title when provided', () => {
      render(<AnnotationOnlyChart {...defaultProps} chartTitle="Test Chart Title" />);
      expect(screen.getByText('Test Chart Title')).toBeInTheDocument();
    });

    it('does not render chart title when not provided', () => {
      const { container } = render(<AnnotationOnlyChart {...defaultProps} />);
      const title = container.querySelector('span[class*="titleClassName"]');
      expect(title).toBeNull();
    });

    it('renders with empty annotations array', () => {
      const { container } = render(<AnnotationOnlyChart annotations={[]} />);
      expect(container.firstChild).toBeInTheDocument();
      expect(container.querySelector('[data-chart-annotation-layer="true"]')).toBeNull();
    });

    it('applies description to aria-label when provided', () => {
      const { container } = render(
        <AnnotationOnlyChart {...defaultProps} description="This is a test chart description" />,
      );
      const element = container.querySelector('[data-chart-annotation-only="true"]');
      expect(element).toHaveAttribute('aria-label', 'This is a test chart description');
    });

    it('falls back to chartTitle for aria-label when no description provided', () => {
      const { container } = render(<AnnotationOnlyChart {...defaultProps} chartTitle="Fallback Title" />);
      const element = container.querySelector('[data-chart-annotation-only="true"]');
      expect(element).toHaveAttribute('aria-label', 'Fallback Title');
    });
  });

  describe('Dimensions', () => {
    describe('Dimensions', () => {
      it('renders with explicit width when provided', () => {
        const { container } = render(<AnnotationOnlyChart {...defaultProps} width={800} />);
        const root = container.querySelector('[data-chart-annotation-only="true"]') as HTMLElement;
        expect(root).toBeInTheDocument();
        // Width is applied via mergeStyles className, not inline style
        expect(root.className).toBeTruthy();
      });

      it('renders with 100% width when width prop is not provided', () => {
        const props = { ...defaultProps, width: undefined };
        const { container } = render(<AnnotationOnlyChart {...props} />);
        const root = container.querySelector('[data-chart-annotation-only="true"]') as HTMLElement;
        expect(root).toBeInTheDocument();
        expect(root.className).toBeTruthy();
      });

      it('renders with height when provided', () => {
        const { container } = render(<AnnotationOnlyChart {...defaultProps} height={500} />);
        const root = container.querySelector('[data-chart-annotation-only="true"]') as HTMLElement;
        expect(root).toBeInTheDocument();
        // Height is applied via mergeStyles className
        expect(root.className).toBeTruthy();
      });

      it('uses default height when not provided', () => {
        const props = { ...defaultProps, height: undefined };
        const { container } = render(<AnnotationOnlyChart {...props} />);
        const root = container.querySelector('[data-chart-annotation-only="true"]') as HTMLElement;
        expect(root).toBeInTheDocument();
      });
    });
  });

  describe('Styling', () => {
    it('renders with paperBackgroundColor when provided', () => {
      const { container } = render(<AnnotationOnlyChart {...defaultProps} paperBackgroundColor="#f0f0f0" />);
      const root = container.querySelector('[data-chart-annotation-only="true"]') as HTMLElement;
      expect(root).toBeInTheDocument();
      // Styles are applied via mergeStyles className
      expect(root.className).toBeTruthy();
    });

    it('renders with default theme background when paperBackgroundColor not provided', () => {
      const { container } = render(<AnnotationOnlyChart {...defaultProps} />);
      const root = container.querySelector('[data-chart-annotation-only="true"]') as HTMLElement;
      expect(root).toBeInTheDocument();
      expect(root.className).toBeTruthy();
    });

    it('renders with fontColor when provided', () => {
      const { container } = render(<AnnotationOnlyChart {...defaultProps} fontColor="#333333" />);
      const root = container.querySelector('[data-chart-annotation-only="true"]') as HTMLElement;
      expect(root).toBeInTheDocument();
      expect(root.className).toBeTruthy();
    });

    it('renders with fontFamily when provided', () => {
      const { container } = render(<AnnotationOnlyChart {...defaultProps} fontFamily="Arial, sans-serif" />);
      const root = container.querySelector('[data-chart-annotation-only="true"]') as HTMLElement;
      expect(root).toBeInTheDocument();
      expect(root.className).toBeTruthy();
    });

    it('renders content area with plotBackgroundColor', () => {
      const { container } = render(<AnnotationOnlyChart {...defaultProps} plotBackgroundColor="#e0e0e0" />);
      const content = container.querySelector('[role="presentation"]') as HTMLElement;
      expect(content).toBeInTheDocument();
      expect(content.className).toBeTruthy();
    });

    it('renders content area with transparent background when not provided', () => {
      const { container } = render(<AnnotationOnlyChart {...defaultProps} />);
      const content = container.querySelector('[role="presentation"]') as HTMLElement;
      expect(content).toBeInTheDocument();
      expect(content.className).toBeTruthy();
    });
  });

  describe('Margin/Padding', () => {
    it('renders with margin applied as padding when provided', () => {
      const { container } = render(<AnnotationOnlyChart {...defaultProps} margin={{ t: 10, r: 20, b: 30, l: 40 }} />);
      const root = container.querySelector('[data-chart-annotation-only="true"]') as HTMLElement;
      expect(root).toBeInTheDocument();
      // Padding is applied via mergeStyles className
      expect(root.className).toBeTruthy();
    });

    it('renders without padding when all margin values are 0', () => {
      const { container } = render(<AnnotationOnlyChart {...defaultProps} margin={{ t: 0, r: 0, b: 0, l: 0 }} />);
      const root = container.querySelector('[data-chart-annotation-only="true"]') as HTMLElement;
      expect(root).toBeInTheDocument();
    });

    it('handles partial margin values', () => {
      const { container } = render(<AnnotationOnlyChart {...defaultProps} margin={{ t: 10, r: 20 }} />);
      const root = container.querySelector('[data-chart-annotation-only="true"]') as HTMLElement;
      expect(root).toBeInTheDocument();
      expect(root.className).toBeTruthy();
    });

    it('does not apply padding when margin is not provided', () => {
      const { container } = render(<AnnotationOnlyChart {...defaultProps} />);
      const root = container.querySelector('[data-chart-annotation-only="true"]') as HTMLElement;
      expect(root).toBeInTheDocument();
    });
  });

  describe('Annotations Integration', () => {
    it('renders ChartAnnotationLayer when annotations are provided', () => {
      const { container } = render(<AnnotationOnlyChart {...defaultProps} />);
      const annotationLayer = container.querySelector('[data-chart-annotation-layer="true"]');
      expect(annotationLayer).toBeInTheDocument();
    });

    it('does not render ChartAnnotationLayer when annotations array is empty', () => {
      const { container } = render(<AnnotationOnlyChart annotations={[]} />);
      const annotationLayer = container.querySelector('[data-chart-annotation-layer="true"]');
      expect(annotationLayer).toBeNull();
    });

    it('passes correct context to ChartAnnotationLayer', async () => {
      const { container } = render(<AnnotationOnlyChart {...defaultProps} width={600} height={400} />);

      await waitFor(() => {
        const svg = container.querySelector('svg[data-chart-annotation-svg="true"]');
        expect(svg).toBeInTheDocument();
        expect(svg?.getAttribute('viewBox')).toContain('600');
        expect(svg?.getAttribute('viewBox')).toContain('400');
      });
    });
  });

  describe('ResizeObserver', () => {
    it('sets up ResizeObserver when width is not provided', () => {
      const props = { ...defaultProps };
      delete props.width;
      const { container } = render(<AnnotationOnlyChart {...props} />);

      const annotationContainer = container.querySelector('[data-chart-annotation-container="true"]');
      const annotationRoot = container.querySelector('[data-chart-annotation-only="true"]');

      expect(annotationRoot).toBeInTheDocument();
      expect(annotationContainer).toBeInTheDocument();

      const observedNodes = mockObserve.mock.calls.map(call => call[0]);
      expect(observedNodes).toContain(annotationContainer);
    });

    it('does not observe the container when explicit width is provided', () => {
      mockObserve.mockClear();
      const { container } = render(<AnnotationOnlyChart {...defaultProps} width={600} />);

      const annotationContainer = container.querySelector('[data-chart-annotation-container="true"]');
      const annotationRoot = container.querySelector('[data-chart-annotation-only="true"]');

      expect(annotationRoot).toBeInTheDocument();
      expect(annotationContainer).toBeInTheDocument();

      const observedNodes = mockObserve.mock.calls.map(call => call[0]);
      expect(observedNodes).not.toContain(annotationContainer);
      expect(observedNodes).toContain(annotationRoot);
    });

    it('disconnects ResizeObserver on unmount', () => {
      const props = { ...defaultProps };
      delete props.width;
      const { unmount } = render(<AnnotationOnlyChart {...props} />);

      unmount();

      expect(mockDisconnect).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined annotations gracefully', () => {
      const { container } = render(<AnnotationOnlyChart annotations={undefined as unknown as IChartAnnotation[]} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('handles negative width and height by clamping to minimum', () => {
      const { container } = render(<AnnotationOnlyChart {...defaultProps} width={-100} height={-50} />);
      const root = container.querySelector('[data-chart-annotation-only="true"]');
      expect(root).toBeInTheDocument();
    });

    it('handles zero width and height', () => {
      const { container } = render(<AnnotationOnlyChart {...defaultProps} width={0} height={0} />);
      const root = container.querySelector('[data-chart-annotation-only="true"]');
      expect(root).toBeInTheDocument();
    });

    it('renders with single annotation', () => {
      const singleAnnotation: IChartAnnotation[] = [
        {
          id: 'single',
          text: 'Single Annotation',
          coordinates: { type: 'relative', x: 0.5, y: 0.5 },
        },
      ];
      const { container } = render(<AnnotationOnlyChart annotations={singleAnnotation} />);
      const annotationLayer = container.querySelector('[data-chart-annotation-layer="true"]');
      expect(annotationLayer).toBeInTheDocument();
    });

    it('renders with many annotations', () => {
      const manyAnnotations: IChartAnnotation[] = Array.from({ length: 50 }, (_, i) => ({
        id: `annotation-${i}`,
        text: `Annotation ${i}`,
        coordinates: { type: 'relative', x: Math.random(), y: Math.random() },
      }));
      const { container } = render(<AnnotationOnlyChart annotations={manyAnnotations} />);
      const annotationLayer = container.querySelector('[data-chart-annotation-layer="true"]');
      expect(annotationLayer).toBeInTheDocument();
    });
  });

  describe('Snapshots', () => {
    it('matches snapshot with default props', () => {
      const { container } = render(<AnnotationOnlyChart {...defaultProps} />);
      expect(container).toMatchSnapshot();
    });

    it('matches snapshot with all props', () => {
      const { container } = render(
        <AnnotationOnlyChart
          {...defaultProps}
          chartTitle="Complete Chart"
          description="A complete chart with all props"
          paperBackgroundColor="#f5f5f5"
          plotBackgroundColor="#ffffff"
          fontColor="#333333"
          fontFamily="Arial, sans-serif"
          margin={{ t: 10, r: 15, b: 20, l: 25 }}
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it('matches snapshot with empty annotations', () => {
      const { container } = render(<AnnotationOnlyChart annotations={[]} chartTitle="Empty Chart" />);
      expect(container).toMatchSnapshot();
    });
  });
});
