import * as React from 'react';
import {
  CommandBar,
  Pivot,
  PivotLinkFormat,
  PivotLinkSize
} from '../../../../index';
import { sampleItems } from './Pivot.Basic.Example';
import './PivotExample.scss';

export class PivotVariationsExample extends React.Component<{}, any> {
  constructor() {
    super();
    this.state = {
      linkSize: PivotLinkSize.normal,
      linkFormat: PivotLinkFormat.tabs
    };
  }

  public render() {
    let { linkFormat, linkSize } = this.state;

    return (
      <div>
        <CommandBar className='PivotExample-commandBar' items={ this._getCommands() } />
        <Pivot items={ sampleItems } linkFormat={ linkFormat } linkSize={ linkSize } />
      </div>
    );
  }

  private _getCommands() {
    return [
      {
        name: 'Pivot format',
        items: this._getCommandsFromEnum('linkFormat', PivotLinkFormat)
      },
      {
        name: 'Pivot size',
        items: this._getCommandsFromEnum('linkSize', PivotLinkSize)
      }
    ];
  }

  private _getCommandsFromEnum(stateName: string, typeEnum: any) {
    let commands = [];

    for (let enumName in typeEnum) {
      if (isNaN(Number(enumName))) {
        commands.push({
          key: enumName,
          name: enumName,
          canCheck: true,
          isChecked: this.state[stateName] === typeEnum[enumName],
          onClick: () => this.setState({ [stateName]: typeEnum[enumName] })
        });
      }
    }

    return commands;
  }
}
