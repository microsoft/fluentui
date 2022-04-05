import * as React from 'react';
import { FiberNavigator } from './FiberNavigator';

interface DebugRectProps {
  showBackground?: boolean;
  showClassName?: boolean;
  showCropMarks?: boolean;
  showElement?: boolean;
  fiberNav: FiberNavigator;
  renderLabel?: (fiberNav: FiberNavigator) => string;
}

const cropMarkStyle: React.CSSProperties = {
  position: 'absolute',
  background: '#6495ed88',
};

export class DebugRect extends React.Component<DebugRectProps> {
  selectorRef = React.createRef<HTMLPreElement>();

  static defaultProps = {
    showBackground: true,
    showClassName: true,
    showElement: true,
    renderLabel: fiberNav => `<${fiberNav.name} />`,
  };

  componentDidMount() {
    this.setDebugSelectorPosition();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.setDebugSelectorPosition();
  }

  setDebugSelectorPosition = () => {
    const { fiberNav } = this.props;

    if (
      fiberNav &&
      fiberNav.domNode &&
      fiberNav.domNode.getBoundingClientRect &&
      typeof fiberNav.domNode.getBoundingClientRect === 'function' &&
      this.selectorRef.current
    ) {
      const rect = fiberNav.domNode.getBoundingClientRect();

      this.selectorRef.current.style.top = `${rect.top}px`;
      this.selectorRef.current.style.left = `${rect.left}px`;
      this.selectorRef.current.style.width = `${rect.width}px`;
      this.selectorRef.current.style.height = `${rect.height}px`;

      requestAnimationFrame(this.setDebugSelectorPosition);
    }
  };

  render() {
    const { fiberNav, showBackground, showClassName, showCropMarks, showElement, renderLabel } = this.props;

    if (!fiberNav) {
      return null;
    }

    const label = renderLabel(fiberNav);

    return (
      <pre
        ref={this.selectorRef}
        style={{
          position: 'fixed',
          padding: 0,
          margin: 0,
          background: showBackground ? '#6495ed11' : 'none',
          outline: '2px solid #6495edcc',
          outlineOffset: '-1px',
          zIndex: 99999999,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {label && (
          <div
            style={{
              position: 'absolute',
              padding: '2px 4px',
              margin: '-1px 0 0 -1px',
              bottom: '100%',
              left: 0,
              color: '#fff',
              background: '#6495ed',
              zIndex: 1, // above crop marks
            }}
          >
            <span style={{ fontWeight: 'bold' }}>{renderLabel(fiberNav)}</span>
          </div>
        )}
        {showCropMarks && (
          <>
            {/* Top Left */}
            <div
              style={{
                ...cropMarkStyle,
                width: '12px',
                height: '1px',
                top: '0',
                left: '-20px',
              }}
            />
            <div
              style={{
                ...cropMarkStyle,
                width: '1px',
                height: '12px',
                top: '-20px',
                left: '0',
              }}
            />

            {/* Top Right */}
            <div
              style={{
                ...cropMarkStyle,
                width: '12px',
                height: '1px',
                top: '0',
                right: '-20px',
              }}
            />
            <div
              style={{
                ...cropMarkStyle,
                width: '1px',
                height: '12px',
                top: '-20px',
                right: '0',
              }}
            />

            {/* Bottom Left */}
            <div
              style={{
                ...cropMarkStyle,
                width: '12px',
                height: '1px',
                bottom: '0',
                left: '-20px',
              }}
            />
            <div
              style={{
                ...cropMarkStyle,
                width: '1px',
                height: '12px',
                bottom: '-20px',
                left: '0',
              }}
            />

            {/* Bottom Right */}
            <div
              style={{
                ...cropMarkStyle,
                width: '12px',
                height: '1px',
                bottom: '0',
                right: '-20px',
              }}
            />
            <div
              style={{
                ...cropMarkStyle,
                width: '1px',
                height: '12px',
                bottom: '-20px',
                right: '0',
              }}
            />
          </>
        )}
        {fiberNav.domNode && (showElement || showClassName) && (
          <div
            style={{
              fontSize: '0.9em',
              position: 'absolute',
              padding: '2px 4px',
              margin: '0 0 1px -1px',
              top: '100%',
              left: 0,
              background: '#6495ed',
            }}
          >
            {showElement && (
              <strong style={{ fontWeight: 'bold', color: 'hsl(160, 100%, 80%)' }}>
                {fiberNav.domNode.tagName && fiberNav.domNode.tagName.toLowerCase()}
              </strong>
            )}
            {showClassName &&
              fiberNav.domNode.hasAttribute &&
              typeof fiberNav.domNode.hasAttribute === 'function' &&
              fiberNav.domNode.hasAttribute('class') && (
                <span style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                  .{(fiberNav.domNode.getAttribute('class') || '').replace(/ +/g, '.')}
                </span>
              )}
          </div>
        )}
      </pre>
    );
  }
}
