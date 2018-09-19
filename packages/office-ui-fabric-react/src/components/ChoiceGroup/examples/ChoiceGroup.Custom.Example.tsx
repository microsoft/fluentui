import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

import * as stylesImport from './ChoiceGroup.Custom.Example.scss';
const styles: any = stylesImport;

export class ChoiceGroupCustomExample extends React.Component {
  public render(): JSX.Element {
    return (
      <div>
        <ChoiceGroup
          defaultSelectedKey="B"
          options={[
            {
              key: 'A',
              text: 'Mark displayed items as read after',
              onRenderField: (props: IChoiceGroupOption, render: ((props?: IChoiceGroupOption) => JSX.Element | null)) => {
                return (
                  <div className={css(styles.root)}>
                    {render!(props)}
                    <Dropdown
                      className={css(styles.dropdown)}
                      defaultSelectedKey="A"
                      options={[
                        { key: 'A', text: '5 seconds' },
                        { key: 'B', text: '10 seconds' },
                        { key: 'C', text: '20 seconds' }
                      ]}
                      disabled={false}
                    />
                  </div>
                );
              }
            },
            {
              key: 'B',
              text: 'Option B'
            },
            {
              key: 'C',
              text: 'Option C',
              disabled: true
            },
            {
              key: 'D',
              text: 'Option D',
              disabled: false
            }
          ]}
          onChange={this._onChange}
          label="Pick one"
          required={true}
        />
      </div>
    );
  }

  private _onChange = (ev: React.FormEvent<HTMLInputElement>, option: any): void => {
    console.dir(option);
  };
}
