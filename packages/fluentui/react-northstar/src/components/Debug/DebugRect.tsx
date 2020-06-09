import * as React from 'react';
import FiberNavigator from './FiberNavigator';

interface DebugRectProps {
  fiberNav: FiberNavigator;
}

class DebugRect extends React.Component<DebugRectProps> {
  selectorRef = React.createRef<HTMLPreElement>();

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
    const { fiberNav } = this.props;

    if (!fiberNav) {
      return null;
    }

    return (
      <pre
        ref={this.selectorRef}
        style={{
          position: 'fixed',
          padding: 0,
          margin: 0,
          background: '#6495ed22',
          border: '1px solid #6495edcc',
          zIndex: 99999999,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            padding: '2px 4px',
            margin: '-1px 0 0 -1px',
            bottom: '100%',
            left: 0,
            color: '#fff',
            background: '#6495ed',
          }}
        >
          <span style={{ fontWeight: 'bold' }}>{`<${fiberNav.name} />`}</span>
        </div>
        {fiberNav.domNode && (
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
            <strong style={{ fontWeight: 'bold', color: 'hsl(160, 100%, 80%)' }}>
              {fiberNav.domNode.tagName && fiberNav.domNode.tagName.toLowerCase()}
            </strong>
            {fiberNav.domNode.hasAttribute &&
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

export default DebugRect;
