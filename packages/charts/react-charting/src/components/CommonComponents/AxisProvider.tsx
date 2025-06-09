import { useAxis } from './hooks/useAxis';

const AxisProvider = ({ children }) => {
  const axisProps = useAxis();
  return children(axisProps);
};

export default AxisProvider;
