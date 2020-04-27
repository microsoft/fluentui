type UseSlotPropsResult = (slot: string) => Record<string, any>;

const useSlotProps = <P = {}>(
  mapPropsToSlotPropsChain: ((props: P) => Record<string, object>)[],
  props: P,
): UseSlotPropsResult => {
  const getSlotProps: UseSlotPropsResult = slot => {
    return mapPropsToSlotPropsChain.reduce(
      (acc, definition) => ({
        ...acc,
        ...(definition(props)[slot] || {}),
      }),
      {},
    );
  };

  return getSlotProps;
};

export default useSlotProps;
