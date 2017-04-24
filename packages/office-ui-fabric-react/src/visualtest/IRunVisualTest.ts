
export interface IRunVisualTest {
  selector: string;
  fileName: string;
  commands: ((params: IRunVisualTest) => void)[];
  childParams?: IRunVisualTest;
}