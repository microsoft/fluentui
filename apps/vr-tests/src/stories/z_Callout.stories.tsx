// NOTE: filename is prefixed with z_ to make callout tests run last to avoid instability
/* eslint-disable react/self-closing-comp, jsx-a11y/iframe-has-title */

import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Callout, DirectionalHint, ICalloutProps } from '@fluentui/react';

const calloutContent = (
  <p className="ms-CalloutExample-subText" id="callout-description-1">
    Message body is optional. If help documentation is available, consider adding a link to learn
    more at the bottom.
  </p>
);

const defaultProps: ICalloutProps = {
  target: '#target',
  calloutWidth: 200,

  // Try to stabilize tests by disabling layer and animation
  // TODO: investigate and re-enable
  doNotLayer: true,
  styles: {
    root: {
      animation: 'none',
    },
  },
};

storiesOf('Callout', module)
  .addDecorator(story => (
    <div
      style={{
        alignItems: 'center',
        width: '800px',
        height: '800px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div id="target">Width of callout is 200 unless otherwise noted</div>
      {story()}
    </div>
  ))
  .addDecorator(story =>
    // prettier-ignore
    <Screener
      steps={new Screener.Steps()
        .snapshot('default')
        .end()}
    >
      {story()}
    </Screener>,
  )
  .addStory('Root', () =>
    // prettier-ignore
    <Callout {...defaultProps} >
      {calloutContent}
    </Callout>,
  )
  .addStory('Bottom auto edge', () => (
    <Callout {...defaultProps} directionalHint={DirectionalHint.bottomAutoEdge}>
      {calloutContent}
    </Callout>
  ))
  .addStory('Bottom center', () => (
    <Callout {...defaultProps} directionalHint={DirectionalHint.bottomCenter}>
      {calloutContent}
    </Callout>
  ))
  .addStory(
    'Bottom left edge',
    () => (
      <Callout {...defaultProps} directionalHint={DirectionalHint.bottomLeftEdge}>
        {calloutContent}
      </Callout>
    ),
    { rtl: true },
  )
  .addStory(
    'Bottom right edge',
    () => (
      <Callout {...defaultProps} directionalHint={DirectionalHint.bottomRightEdge}>
        {calloutContent}
      </Callout>
    ),
    { rtl: true },
  )
  .addStory('Left bottom edge', () => (
    <Callout {...defaultProps} directionalHint={DirectionalHint.leftBottomEdge}>
      {calloutContent}
    </Callout>
  ))
  .addStory('Left center', () => (
    <Callout {...defaultProps} directionalHint={DirectionalHint.leftCenter}>
      {calloutContent}
    </Callout>
  ))
  .addStory('Left top edge', () => (
    <Callout {...defaultProps} directionalHint={DirectionalHint.leftTopEdge}>
      {calloutContent}
    </Callout>
  ))
  .addStory('Right bottom edge', () => (
    <Callout {...defaultProps} directionalHint={DirectionalHint.rightBottomEdge}>
      {calloutContent}
    </Callout>
  ))
  .addStory('Right center', () => (
    <Callout {...defaultProps} directionalHint={DirectionalHint.rightCenter}>
      {calloutContent}
    </Callout>
  ))
  .addStory('Right top edge', () => (
    <Callout {...defaultProps} directionalHint={DirectionalHint.rightTopEdge}>
      {calloutContent}
    </Callout>
  ))
  .addStory('Top auto edge', () => (
    <Callout {...defaultProps} directionalHint={DirectionalHint.topAutoEdge}>
      {calloutContent}
    </Callout>
  ))
  .addStory('Top center', () => (
    <Callout {...defaultProps} directionalHint={DirectionalHint.topCenter}>
      {calloutContent}
    </Callout>
  ))
  .addStory('Top left edge', () => (
    <Callout {...defaultProps} directionalHint={DirectionalHint.topLeftEdge}>
      {calloutContent}
    </Callout>
  ))
  .addStory('Top right edge', () => (
    <Callout {...defaultProps} directionalHint={DirectionalHint.topRightEdge}>
      {calloutContent}
    </Callout>
  ))
  .addStory('Beak 25', () => (
    <Callout {...defaultProps} beakWidth={25}>
      {calloutContent}
    </Callout>
  ))
  .addStory('Gap space 25', () => (
    <Callout {...defaultProps} gapSpace={25}>
      {calloutContent}
    </Callout>
  ))
  .addStory('No beak', () => (
    <Callout {...defaultProps} isBeakVisible={false}>
      {calloutContent}
    </Callout>
  ))
  .addStory('No callout width specified', () => (
    <Callout {...defaultProps} calloutWidth={undefined}>
      {calloutContent}
    </Callout>
  ))
  .addStory('Rendering callout attached to an element inside of an iframe', () => {
    const iframeRef = React.useRef<HTMLIFrameElement | null>(null);
    const [target, setTarget] = React.useState({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    });

    React.useEffect(() => {
      if (iframeRef.current) {
        const iframe = iframeRef.current;
        const iframeWindow = iframe.contentWindow;
        if (iframeWindow) {
          iframeWindow.onload = () => {
            const iframeDocument = iframeWindow.document;
            const button = iframeDocument.getElementById('button1');
            if (button) {
              button!.style.border = '1px solid red';

              const iframeRect = iframe.getBoundingClientRect();
              const buttonRect = button!.getBoundingClientRect();
              setTarget({
                left: iframeRect.x + buttonRect.x,
                top: iframeRect.y + buttonRect.y,
                right: iframeRect.x + buttonRect.x + buttonRect.width,
                bottom: iframeRect.y + buttonRect.y + buttonRect.height,
              });
            }
          };
        }
      }
    });

    return (
      <>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <iframe
          ref={iframeRef}
          id="iframe"
          srcDoc="<br /><br /><br /><br /><br /><br /><button id='button1'>HELLO</button>"
        ></iframe>
        <br />
        <Callout {...defaultProps} target={target}>
          {calloutContent}
        </Callout>
      </>
    );
  });
