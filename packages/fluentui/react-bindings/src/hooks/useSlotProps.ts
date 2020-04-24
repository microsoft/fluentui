type UseSlotPropsResult = (slot: string) => object;

const useSlotProps = <P = {}>(
  slotPropsChain: Record<string, (props: P) => Partial<P> | Partial<P>>[],
  props: P,
): UseSlotPropsResult => {
  const getSlotProps: UseSlotPropsResult = slot => {
    return slotPropsChain.reduce(
      (acc, slotProps) => ({
        ...acc,
        ...(typeof slotProps[slot] === 'function' ? slotProps[slot](props) : slotProps[slot] || {}),
      }),
      {},
    );
  };

  return getSlotProps;
};

export default useSlotProps;
