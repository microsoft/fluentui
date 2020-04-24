type UseSlotPropsResult = (slot: string) => object;

const useSlotProps = <P = {}>(
  slotProps: Record<string, (props: P) => object | object>,
  props: P,
): UseSlotPropsResult => {
  const getSlotProps: UseSlotPropsResult = slot => {
    return typeof slotProps[slot] === 'function' ? slotProps[slot](props) : slotProps[slot] || {};
  };

  return getSlotProps;
};

export default useSlotProps;
