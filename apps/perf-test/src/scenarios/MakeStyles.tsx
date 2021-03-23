import * as React from 'react';

const View: React.FunctionComponent<{ className?: string }> = props => {
  const { className } = props;

  return <div className={className} />;
};

const Box: React.FunctionComponent<{}> = () => {
  return <View />;
};

const Scenario = () => <Box />;

export default Scenario;
