export interface Response {
  results: { name: string }[];
}

export const mockFetch = (type: string) => {
  return new Promise<Response>(resolve => {
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
