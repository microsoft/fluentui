import { EventLayer, ScreenEvent, FileExtn } from './RunVisualTest';
import { IdType } from './RunVisualTest'
import { RunVisualTest } from './RunVisualTest';

export interface IRunVisualTest {

  componentId: string;
  componentIdType;
  eventType: EventLayer;
  eventList: ScreenEvent[];
  secondLayer?: RunVisualTest;

}