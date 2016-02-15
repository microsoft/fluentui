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
        <div><Link target='_blank' text='CommandBars' url='http://dev.office.com/fabric/components/commandBar' /> provide a menu control to expose application commands. Command bars typically are rendered just below the header.</div>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='CommandBar with search box and overflowing menu items'>
          <CommandBar
            isSearchBoxVisible={ true }
            searchPlaceholderText='Search...'
            items={
              [
                {
                  key: 'newItem',
                  name: 'New',
                  icon: 'circlePlus',
                  items: [
                    {
                      key: 'emailMessage',
                      name: 'Email message',
                      icon: 'mail'
                    },
                    {
                      key: 'calendarEvent',
                      name: 'Calendar event',
                      icon: 'calendar'
                    }
                  ]
                },
                {
                  key: 'upload',
                  name: 'Upload',
                  icon: 'upload'
                },
                {
                  key: 'share',
                  name: 'Share',
                  icon: 'share'
                },
                {
                  key: 'download',
                  name: 'Download',
                  icon: 'download'
                },
                {
                  key: 'move',
                  name: 'Move to...',
                  icon: 'folderMove'
                },
                {
                  key: 'copy',
                  name: 'Copy to...',
                  icon: 'copy'
                },
                {
                  key: 'rename',
                  name: 'Rename...',
                  icon: 'editBox'
                }
              ]
            }
            farItems={
              [
                {
                  key: 'sort',
                  name: 'Sort',
                  icon: 'sortLines'
                },
                {
                  key: 'tile',
                  name: 'Grid view',
                  icon: 'tile'
                },
                {
                  key: 'info',
                  name: 'Info',
                  icon: 'circleInfo'
                }
              ]
            }
          />
        </ExampleCard>

      </div>
    );
  }

}
