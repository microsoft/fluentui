
export interface IRunVisualTest {
  componentExtnid: string;
  fileName: string;
  command: ((params: IRunVisualTest) => void)[];
  childParam?: IRunVisualTest;

}