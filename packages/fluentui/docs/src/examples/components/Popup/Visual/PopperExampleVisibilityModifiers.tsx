import { Popup, popupContentSlotClassNames } from '@fluentui/react-northstar';
import * as _ from 'lodash';
import * as React from 'react';

const PopperExampleVisibilityModifiers = () => (
  <>
    <p style={{ marginTop: 50 }}>
      This visual test asserts that visual styles are applied based on popper element's state:
    </p>
    <ul>
      <li>
        <b style={{ color: 'green' }}>green</b> when the popper element intersects boundaries
      </li>
      <li>
        <b style={{ color: 'red' }}>red</b> when the reference is hidden
      </li>
      <li>
        <b style={{ backgroundColor: 'yellow' }}>yellow</b> when the popper escapes the reference element's boundary
      </li>
    </ul>
    <div
      id="scrollable-area"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        border: '3px dotted purple',
        height: 400,
        width: 400,
        overflow: 'scroll',
        marginTop: 50,
        marginLeft: 50,
      }}
    >
      {_.times(20).map(i => (
        <Popup
          align="center"
          position="above"
          key={i}
          content={{
            styles: {
              [`& .${popupContentSlotClassNames.content}`]: {
                backgroundColor: '#ccc',
                minHeight: '60px',
                width: '200px',
              },
              '[data-popper-reference-hidden]': {
                [`& .${popupContentSlotClassNames.content}`]: {
                  outline: '5px solid red',
                },
              },
              '[data-popper-escaped]': {
                [`& .${popupContentSlotClassNames.content}`]: {
                  backgroundColor: 'yellow',
                },
              },
              '[data-popper-is-intersecting]': {
                [`& .${popupContentSlotClassNames.content}`]: {
                  outline: '5px solid green',
                },
              },
            },
          }}
        >
          <div id={`message-${i}`} style={{ border: '2px solid grey', padding: 5, marginLeft: 10 }}>
            <p>message: {i}</p>
          </div>
        </Popup>
      ))}
    </div>
  </>
);

export default PopperExampleVisibilityModifiers;
