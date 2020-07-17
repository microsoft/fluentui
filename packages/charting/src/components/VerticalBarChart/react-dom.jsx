import React from 'react';
const reactDom = jest.genMockFromModule('react-dom');

function mockCreatePortal(element, target) {
  return (
    <div>
      <div id="content">{element}</div>
      <div id="target" data-target-tag-name={target.tagName} />
    </div>
  );
}

reactDom.createPortal = mockCreatePortal;

module.exports = reactDom;
