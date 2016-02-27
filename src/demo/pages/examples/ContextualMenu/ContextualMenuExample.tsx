import * as React from 'react';
import ContextualMenu from '../../../../components/ContextualMenu/index';
import ContextualMenuProps from './ContextualMenuProperties'
import Link from '../../../../components/Link/index';
import ExampleCard from '../../../components/ExampleCard/index';
import PropertiesTable from '../../../components/PropertiesTable/index';

let ContextualMenuExampleCode = require('./ContextualMenuExampleCode.txt');

export default class ContextualMenuExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ContextualMenuExample'>
        <h1 className='ms-font-xxl'>ContextualMenu</h1>
        <div><Link target='_blank' text='ContextualMenus' url='http://dev.office.com/fabric/components/contextualMenu' /> provide a menu for use in context menus and dropdowns.</div>

        <PropertiesTable properties={ ContextualMenuProps } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='ContextualMenu' code= { ContextualMenuExampleCode }>
         <ContextualMenu
            shouldFocusOnMount={ false }
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
                    },
                    {
                      key: 'calendarEvent',
                      name: 'Calendar event',
                    }
                  ]
                },
                {
                  key: 'upload',
                  name: 'Upload',
                  icon: 'upload'
                },
                {
                  key: 'rename',
                  name: 'Rename',
                },
                {
                  key: '-',
                  name: '-',
                },
                {
                  key: 'share',
                  name: 'Share',
                  icon: 'share',
                  items: [
                    {
                      key: 'sharetoemail',
                      name: 'Share to Email',
                      icon: 'mail'
                    },
                    {
                      key: 'sharetofacebook',
                      name: 'Share to Facebook',
                    },
                    {
                      key: 'sharetotwitter',
                      name: 'Share to Twitter',
                      icon: 'share'
                    },
                  ]
                },
                {
                  key: 'print',
                  name: 'Print',
                  icon: 'print'
                },
              ]
            }
          />
        </ExampleCard>

      </div>
    );
  }

}
