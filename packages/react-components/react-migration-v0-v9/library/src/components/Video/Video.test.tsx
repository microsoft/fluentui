import '@testing-library/jest-dom';
import * as React from 'react';
import { render } from '@testing-library/react';
// import { isConformant } from '@fluentui/react-conformance';

import { Video } from './Video';
import styles from './Video.module.css';

describe('Video', () => {
  // out of memory strikes again
  // isConformant({
  //   Component: Video,
  //   componentPath: module!.filename.replace('.test', ''),
  //   displayName: 'Video',
  //   disabledTests: ['has-docblock', 'has-top-level-file', 'component-has-static-classnames-object'],
  // });

  /*
   * Group-marker invariant, asserted by hand because this file's isConformant call is
   * commented out for a pre-existing, non-styling reason.
   */
  it('stamps its group marker and never emits it as classList[0]', () => {
    const { getByTestId } = render(<Video src="video.mp4" data-testid="video-element" />);
    const root = getByTestId('video-element');

    expect(root.classList.contains('group/fui-video')).toBe(true);
    expect(root.classList[0]).not.toMatch(/^(group|peer)\//);
    expect(root.classList[0]).toBe(styles.root);
  });

  it('puts the consumer className last', () => {
    const { getByTestId } = render(<Video src="video.mp4" className="consumer-wins" data-testid="video-element" />);
    const classNames = Array.from(getByTestId('video-element').classList);

    expect(classNames[classNames.length - 1]).toBe('consumer-wins');
  });

  it('renders a video element', () => {
    const { getByTestId } = render(<Video src="video.mp4" data-testid="video-element" />);
    const videoElement = getByTestId('video-element');
    expect(videoElement.nodeName).toBe('VIDEO');
  });

  it('handles autoPlay', () => {
    const { getByTestId } = render(<Video src="video.mp4" autoPlay data-testid="video-element" />);
    const videoElement = getByTestId('video-element');
    expect(videoElement).toHaveAttribute('autoplay');
  });

  it('handles controls', () => {
    const { getByTestId } = render(<Video src="video.mp4" controls data-testid="video-element" />);
    const videoElement = getByTestId('video-element');
    expect(videoElement).toHaveAttribute('controls');
  });

  it('handles loop', () => {
    const { getByTestId } = render(<Video src="video.mp4" loop data-testid="video-element" />);
    const videoElement = getByTestId('video-element');
    expect(videoElement).toHaveAttribute('loop');
  });

  it('handles poster', () => {
    const { getByTestId } = render(<Video src="video.mp4" poster="poster.jpg" data-testid="video-element" />);
    const videoElement = getByTestId('video-element');
    expect(videoElement).toHaveAttribute('poster', 'poster.jpg');
  });
});
