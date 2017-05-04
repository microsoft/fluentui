
export interface IRunVisualTest {
  selector: string;
  fileName: string;
  imageSelector?: string;
  commands: ((params: IRunVisualTest) => void)[];
  childParams?: IRunVisualTest;
}