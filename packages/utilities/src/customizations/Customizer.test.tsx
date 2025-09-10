/*  eslint-disable @typescript-eslint/no-deprecated */
import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen, act } from '@testing-library/react';
import { customizable } from './customizable';
import { Customizer } from './Customizer';
import { Customizations } from './Customizations';

@customizable('Foo', ['field'])
class Foo extends React.Component<{ field?: string }, {}> {
  public render(): JSX.Element {
    return <div>{this.props.field}</div>;
  }
}

@customizable('Bar', ['field', 'field2', 'field3'])
class Bar extends React.Component<{ field?: string; field2?: string; field3?: string }, {}> {
  public render(): JSX.Element {
    return (
      <div>
        {this.props.field}
        {this.props.field2}
        {this.props.field3}
      </div>
    );
  }
}

describe('Customizer', () => {
  beforeEach(() => {
    Customizations.reset();
  });

  it('can provide new defaults', () => {
    render(
      <Customizer settings={{ field: 'customName' }}>
        <Foo />
      </Customizer>,
    );
    expect(screen.getByText('customName')).toBeInTheDocument();
  });

  it('can pass through global settings', () => {
    Customizations.applySettings({ field: 'globalName' });

    render(
      <Customizer settings={{ nonMatch: 'customName' }}>
        <Foo />
      </Customizer>,
    );
    expect(screen.getByText('globalName')).toBeInTheDocument();
  });

  it('can override global settings', () => {
    Customizations.applySettings({ field: 'globalName' });

    render(
      <Customizer settings={{ field: 'customName' }}>
        <Foo />
      </Customizer>,
    );
    expect(screen.getByText('customName')).toBeInTheDocument();
  });

  it('can scope settings to specific components', () => {
    const scopedSettings = {
      Foo: { field: 'scopedToFoo' },
      Bar: { field: 'scopedToBar' },
    };

    render(
      <Customizer scopedSettings={scopedSettings}>
        <div>
          <Foo />
          <Bar />
        </div>
      </Customizer>,
    );
    expect(screen.getByText('scopedToFoo')).toBeInTheDocument();
    expect(screen.getByText('scopedToBar')).toBeInTheDocument();
  });

  it('can layer global settings', () => {
    render(
      <Customizer settings={{ field: 'field' }}>
        <Customizer settings={{ field2: 'field2' }}>
          <Bar />
        </Customizer>
      </Customizer>,
    );
    expect(screen.getByText('fieldfield2')).toBeInTheDocument();
  });

  it('can layer scoped settings', () => {
    Customizations.applySettings({ field3: 'field3' });

    render(
      <Customizer scopedSettings={{ Bar: { field: 'field', field2: 'oldfield2' } }}>
        <Customizer scopedSettings={{ Bar: { field2: 'field2' } }}>
          <Bar />
        </Customizer>
      </Customizer>,
    );
    expect(screen.getByText('fieldfield2field3')).toBeInTheDocument();
  });

  it('can layer scoped settings with scopedSettingsFunction', () => {
    Customizations.applySettings({ field3: 'field3' });

    render(
      <Customizer scopedSettings={{ Bar: { field: 'field' } }}>
        <Customizer
          scopedSettings={(scopedSettings: { Bar: { field2: string } }) => ({
            Bar: { ...scopedSettings.Bar, field2: 'field2' },
          })}
        >
          <Bar />
        </Customizer>
      </Customizer>,
    );
    expect(screen.getByText('fieldfield2field3')).toBeInTheDocument();
  });

  it('it allows scopedSettings to be merged when a function is passed', () => {
    render(
      <Customizer scopedSettings={{ Foo: { field: 'scopedToFoo' } }}>
        <Customizer
          scopedSettings={(settings: { Foo: { field: string } }) => ({ ...settings, Bar: { field: 'scopedToBar' } })}
        >
          <div>
            <Foo />
            <Bar />
          </div>
        </Customizer>
      </Customizer>,
    );
    expect(screen.getByText('scopedToFoo')).toBeInTheDocument();
    expect(screen.getByText('scopedToBar')).toBeInTheDocument();
  });

  it('overrides previously set settings', () => {
    render(
      <Customizer settings={{ field: 'field1' }}>
        <Customizer settings={{ field: 'field2' }}>
          <Bar />
        </Customizer>
      </Customizer>,
    );
    expect(screen.getByText('field2')).toBeInTheDocument();
  });

  it('overrides the old settings when the parameter is ignored', () => {
    render(
      <Customizer settings={{ field: 'field1' }}>
        <Customizer settings={(settings: { field: string }) => ({ field: 'field2' })}>
          <Bar />
        </Customizer>
      </Customizer>,
    );
    expect(screen.getByText('field2')).toBeInTheDocument();
  });

  it('can use a function to merge settings', () => {
    render(
      <Customizer settings={{ field: 'field1' }}>
        <Customizer settings={(settings: { field: string }) => ({ field: settings.field + 'field2' })}>
          <Bar />
        </Customizer>
      </Customizer>,
    );
    expect(screen.getByText('field1field2')).toBeInTheDocument();
  });

  it('can suppress updates', () => {
    Customizations.applySettings({ field: 'globalName' });

    render(
      <Customizer settings={{ nonMatch: 'customName' }}>
        <Bar />
      </Customizer>,
    );
    // verify base state
    expect(screen.getByText('globalName')).toBeInTheDocument();

    act(() => {
      // verify it doesn't update during suppressUpdates(), and it works through errors, and it updates after
      Customizations.applyBatchedUpdates(() => {
        Customizations.applySettings({ field: 'notGlobalName' });
        // it should not update inside
        expect(screen.getByText('globalName')).toBeInTheDocument();
        throw new Error();
      });
    });
    // afterwards it should have updated
    expect(screen.getByText('notGlobalName')).toBeInTheDocument();

    act(() => {
      // verify it doesn't update during suppressUpdates(), works through errors, and can suppress final update
      Customizations.applyBatchedUpdates(() => {
        Customizations.applySettings({ field: 'notUpdated' });
        // it should not update inside
        expect(screen.getByText('notGlobalName')).toBeInTheDocument();
        throw new Error();
      }, true);
    });
    // afterwards, it should still be on the old value
    expect(screen.getByText('notGlobalName')).toBeInTheDocument();

    // verify it updates after suppressUpdates()
    act(() => {
      Customizations.applySettings({ field2: 'lastGlobalName' });
    });
    expect(screen.getByText('notUpdatedlastGlobalName')).toBeInTheDocument();
  });
});
