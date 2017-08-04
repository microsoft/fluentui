/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Link } from 'office-ui-fabric-react/lib/Link';
import { DetailsList, IGroup } from 'office-ui-fabric-react/lib/DetailsList';
import { createListItems, createGroups } from '@uifabric/example-app-base';
import './DetailsListExample.scss';

const ITEMS_PER_GROUP = 20;
const GROUP_COUNT = 20;

let _items: any[];
let _groups: IGroup[];

export class DetailsListCustomGroupHeadersExample extends React.Component<any, any> {
  constructor() {
    super();

    _items = _items || createListItems(500);
    _groups = _groups || createGroups(GROUP_COUNT, 1, 0, ITEMS_PER_GROUP);
  }

  public render() {
    return (
      <div>
        <DetailsList
          items={ _items }
          groups={ _groups }
          groupProps={ {
            onRenderHeader: props => (
              <div className='DetailsListExample-customHeader'>
                <div className='DetailsListExample-customHeaderTitle'>{ `I am a custom header for: ${props!.group!.name}` }</div>
                <div className='DetailsListExample-customHeaderLinkSet'>
                  <Link
                    className='DetailsListExample-customHeaderLink'
                    onClick={ () => props!.onToggleSelectGroup!(props!.group!) }>
                    { props!.isSelected ? 'Remove selection' : 'Select group' }
                  </Link>
                  <Link
                    className='DetailsListExample-customHeaderLink'
                    onClick={ () => props!.onToggleCollapse!(props!.group!) }>
                    { props!.group!.isCollapsed ? 'Expand group' : 'Collapse group' }
                  </Link>
                </div>
              </div>
            ),
            onRenderFooter: props => (
              <div className='DetailsListExample-customHeader'>
                <div className='DetailsListExample-customHeaderTitle'>{ `I'm a custom footer for: ${props!.group!.name}` }</div>
              </div>
            )
          } }
        />
      </div>
    );
  }

}
