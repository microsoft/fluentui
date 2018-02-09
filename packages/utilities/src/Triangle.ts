import { IPoint } from './IPoint';

/**
 * A triangle abstraction class used to make calculations
 */
export class Triangle {
  public readonly vertexOne: IPoint;
  public readonly vertexTwo: IPoint;
  public readonly vertexThree: IPoint;
  public readonly centroid: IPoint;

  constructor(vertexOne: IPoint, vertexTwo: IPoint, vertexThree: IPoint) {
    this.vertexOne = vertexOne;
    this.vertexTwo = vertexTwo;
    this.vertexThree = vertexTwo;

    // Calculate the centroid
    this.centroid = {
      x: (vertexOne.x + vertexTwo.x + vertexTwo.x) / 3,
      y: (vertexOne.y + vertexTwo.y + vertexThree.y) / 3
    };
  }
}