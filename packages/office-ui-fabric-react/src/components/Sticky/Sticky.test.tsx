import * as React from 'react';
import { mount } from 'enzyme';
import { DetailsList, IDetailsHeaderProps } from 'office-ui-fabric-react/lib/DetailsList';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Breadcrumb } from 'office-ui-fabric-react/lib/Breadcrumb';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';

// Populate mock data for testing
function mockData(count: number, isColumn: boolean = false, customDivider: boolean = false): any {
  const data = [];
  let _data = {};

  for (let i = 0; i < count; i++) {
    _data = {
      key: i,
      name: 'Item ' + i,
      value: i
    };
    if (isColumn) {
      _data = {
        ..._data,
        key: `column_key_${i}`,
        ariaLabel: `column_${i}`
      };
    }
    data.push(_data);
  }

  return data;
}

function onRenderDetailsHeader(props: IDetailsHeaderProps, defaultRender?: IRenderFunction<IDetailsHeaderProps>): JSX.Element {
  return (
    <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced={true} stickyClassName={'details-header--sticky-test'}>
      {defaultRender!({
        ...props
      })}
    </Sticky>
  );
}

describe('Sticky', () => {
  it('sticky components are rendered in correct order when there is Breadcrumb', () => {
    const breadcrumbStyle = {
      root: [
        {
          margin: '0 0 0 0'
        }
      ]
    };
    const component = mount(
      <ScrollablePane className={'scrollable-pane-test'}>
        <Sticky stickyPosition={StickyPositionType.Header} stickyClassName={'breadcrumb--sticky-test'}>
          <Breadcrumb
            items={[
              { text: 'Files', key: 'Files' },
              { text: 'This is folder 1', key: 'f1' },
              { text: 'This is folder 2', key: 'f2' },
              { text: 'This is folder 3', key: 'f3' },
              { text: 'This is folder 4', key: 'f4' },
              { text: 'This is folder 5', key: 'f5', isCurrentItem: true }
            ]}
            ariaLabel={'breadcrumb-test'}
            styles={breadcrumbStyle}
          />
        </Sticky>
        <DetailsList
          items={mockData(5)}
          columns={mockData(5, true)}
          // tslint:disable-next-line:jsx-no-lambda
          onRenderRow={() => null}
          skipViewportMeasures={true}
          // tslint:disable-next-line:jsx-no-lambda
          onShouldVirtualize={() => false}
          onRenderDetailsHeader={onRenderDetailsHeader}
        />
      </ScrollablePane>
    );
    expect(component.html()).toMatchSnapshot();
  });
});
