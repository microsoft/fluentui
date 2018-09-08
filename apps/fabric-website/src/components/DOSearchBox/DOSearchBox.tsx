import * as React from 'react';
import './DOSearchBox.scss';

export class DOSearchBox extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div className="od-SearchBox">
        <form
          className="od-SearchBox-searchForm ng-pristine ng-valid"
          action="http://dev.office.com/Search"
          method="get"
        >
          <fieldset>
            <input
              name="q"
              id="q"
              role="Search"
              aria-label="Search Office Dev Center"
              type="text"
              placeholder="Search dev.office.com"
              defaultValue=""
              className="od-SearchBox-field"
            />
            <input name="culture" id="culture" type="hidden" value="en-US" />
            <button type="submit" className="od-SearchBox-button ms-Icon ms-Icon--Search">
              Search
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}
