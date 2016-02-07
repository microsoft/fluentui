import * as React from 'react';
import FocusZone from '../../utilities/focus/FocusZone';

export default class GettingStarted extends React.Component<any, any> {
  public render() {
    return (
      <div className='GettingStarted'>
        <button>hi</button>

          <FocusZone>
            <ul>
              <li>
                <a href="#">Microsoft</a>
                <div data-is-focusable={ true }>I want to play too.</div>
              </li>
              <li>
                <a href="#">Microsoft</a>
              </li>
              <li>
                <a href="#">Microsoft</a>
              </li>
              <li>
                <a href="#">Microsoft</a>
              </li>
            </ul>
          </FocusZone>

        <button>button</button>

      </div>
    );
  }
}
