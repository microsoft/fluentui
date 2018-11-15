/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { ScrollablePane, StickyPositionType, Sticky } from 'office-ui-fabric-react';

const colors = ['#eaeaea', '#dadada', '#d0d0d0', '#c8c8c8', '#a6a6a6', '#c7e0f4'];

const LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nibh enim, tincidunt pellentesque orci id, efficitur dapibus nulla. In sed arcu eget neque rhoncus molestie sit amet in diam. Pellentesque suscipit sem quis arcu luctus, quis tincidunt magna auctor. Mauris dictum ligula ac nulla mattis, ac tincidunt nibh volutpat. Aliquam ante quam, efficitur sit amet euismod in, finibus at ipsum. Praesent blandit nisi in augue eleifend accumsan. Etiam imperdiet sit amet elit iaculis semper. Aliquam et erat egestas nunc ultricies fringilla. Nulla non gravida mauris. Sed euismod aliquam odio a tempus. Curabitur vitae lacus ex. Vivamus iaculis, libero in scelerisque ultricies, enim neque blandit augue, ut ultrices nulla enim ac ligula. In vitae orci vitae diam vestibulum rhoncus.

Pellentesque ante leo, pellentesque nec gravida ac, rutrum eget justo. Sed metus enim, pretium non odio a, varius dapibus mi. Vivamus pharetra accumsan malesuada. Phasellus congue urna ex, efficitur sollicitudin neque vulputate aliquet. Integer eget turpis ultricies, pulvinar libero quis, dictum elit. Fusce elementum porttitor pulvinar. Aenean tempus posuere leo quis cursus. Aliquam nec nisi id nisi rutrum tincidunt. Aliquam erat volutpat. Nullam tempor orci diam, eget pellentesque justo porttitor blandit. Phasellus vulputate augue turpis, ut iaculis nisi malesuada at. Duis euismod.`;

const contentAreas: JSX.Element[] = [];
for (let i = 0; i < 5; i++) {
  contentAreas.push(createContentArea(i));
}

function createContentArea(index: number) {
  const color = colors[index];

  return (
    <div
      key={index}
      style={{
        backgroundColor: color
      }}
    >
      <Sticky stickyPosition={StickyPositionType.Both}>
        <div
          className="sticky"
          style={{
            padding: '5px 20px 5px 10px',
            fontSize: '13px',
            borderTop: '1px solid #000',
            borderBottom: '1px solid #000',
            color: '#201f1e'
          }}>Sticky Component #{index + 1}</div>
      </Sticky>
      <div className="textContent">{LOREM_IPSUM}</div>
    </div>
  );
}

storiesOf('ScrollablePane', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .executeScript('document.getElementsByClassName(\'ms-ScrollablePane--contentContainer\')[0].scrollTop = 9999')
        .snapshot('scrolled', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default ScrollablePane Example', () => (
    <div
      style={{
        height: '600px',
        position: 'relative',
        maxHeight: 'inherit',
        width: '400px'
      }}
    >
      <ScrollablePane className="scrollablePaneDefaultExample"
        style={{ maxWidth: '400px', border: '1px solid #edebe9' }}>
        {contentAreas.map(ele => {
          return ele;
        })}
      </ScrollablePane>
    </div>
  ));
