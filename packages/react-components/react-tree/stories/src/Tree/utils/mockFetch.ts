export interface Response {
  results: { name: string }[];
}

export const mockFetch = (type: string): Promise<Response> => {
  return new Promise<Response>(resolve => {
    // eslint-disable-next-line @nx/workspace-no-restricted-globals
    setTimeout(() => {
      const mockData: Response = {
        results: Array.from({ length: 10 }, (_, index) => ({
          name: `${type} ${index + 1}`,
        })),
      };
      resolve(mockData);
    }, 1000);
  });
};
