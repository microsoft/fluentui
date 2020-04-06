import { Divider } from '@fluentui/react-northstar';

export default props => {
  return Divider.create(props, {
    defaultProps: () => ({
      variables: { dividerColor: 'transparent' },
    }),
  });
};
