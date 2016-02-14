import * as React from 'react';
import CommandBar from '../../../../components/CommandBar';
import Link from '../../../../components/Link';
import ExampleCard from '../../../components/ExampleCard';
import PropertiesTable from '../../../components/PropertiesTable';

export default class CommandBarExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='CommandBarExample'>
        <h1 className='ms-font-xxl'>CommandBar</h1>
        <div><Link target='_blank' text='CommandBars' url='http://dev.office.com/fabric/components/commandBar' /> provide a menu system for commands to exist.</div>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='CommandBar with search box and overflowing menu items'>
          <CommandBar
            isSearchBoxVisible={ true }
            searchPlaceholderText='Search...'
            items={
              [
                {
                  icon: 'circlePlus',
                  name: 'New'
                },
                {
                  icon: 'upload',
                  name: 'Upload'
                },
                {
                  icon: 'share',
                  name: 'Share'
                },
                {
                  icon: 'download',
                  name: 'Download'
                },
                {
                  icon: 'folderMove',
                  name: 'Move to...'
                },
                {
                  icon: 'copy',
                  name: 'Copy to...'
                },
                {
                  icon: 'editBox',
                  name: 'Rename...'
                },
                {
                  icon: 'picture',
                  name: 'Create album from folder'
                },
                {
                  icon: 'embed',
                  name: 'Embed...'
                }
              ]
            }
            farItems={
              [
                {
                  icon: 'sortLines',
                  name: 'Sort'
                },
                {
                  icon: 'tile',
                  name: 'Grid view'
                },
                {
                  icon: 'circleInfo',
                  name: 'Info'
                }
              ]
            }
          />
        </ExampleCard>

      </div>
    );
  }

}
