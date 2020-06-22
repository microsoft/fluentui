import * as React from 'react';
import { IKeytipProps } from '../components/Keytip';
import { KeytipDataOptions, useKeytipData } from '../KeytipData';
import { IKeytipData } from 'office-ui-fabric-react';

/**
 * HOC to output wrapped component that supports keytipProps prop,
 * given an input component that has keytipProps prop deprecated.
 *
 * @param Component Component with keytipData prop and deprecated keytipProps prop.
 */
export function withKeytipData<TProps extends { keytipData?: IKeytipData }>(
  Component: React.ComponentType<TProps>,
): React.ComponentType<TProps & { keytipProps?: IKeytipProps }> {
  const WrappedComponent: React.FunctionComponent<TProps & {
    keytipProps?: IKeytipProps;
    disabled?: boolean;
  }> = props => {
    const options: KeytipDataOptions = {
      keytipProps: props.keytipProps,
      disabled: props.disabled,
    };
    const keytipData = useKeytipData(options);

    return <Component {...props} keytipData={keytipData} />;
  };

  return WrappedComponent;
}
