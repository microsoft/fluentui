import * as React from 'react';
import { CommandBar } from '../../../../components/index';

export default class CommandBarBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
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
      </div>
    );
  }

}
