import { executeFunctionAfterHandler } from './executeFunctionAfterHandler';

describe('executeFunctionAfterHandler tests', () => {
  it('still executes the function even if the handler is undefined', () => {
    const handler = undefined;
    const functionToExecute = jest.fn();

    const wrappedFunction = executeFunctionAfterHandler(handler, functionToExecute);
    wrappedFunction();

    expect(functionToExecute.mock.calls.length).toEqual(1);
  });

  it('still executes the function even if the handler is undefined', () => {
    const handler = jest.fn();
    const functionToExecute = jest.fn();

    const wrappedFunction = executeFunctionAfterHandler(handler, functionToExecute);
    wrappedFunction();

    expect(handler.mock.calls.length).toEqual(1);
    expect(functionToExecute.mock.calls.length).toEqual(1);
  });

  it('passes the arguments through to the handler', () => {
    const handler = jest.fn((x: number, y: number) => undefined);
    const functionToExecute = jest.fn();

    const wrappedFunction = executeFunctionAfterHandler(handler, functionToExecute);
    wrappedFunction(8, 16);

    expect(handler.mock.calls.length).toEqual(1);
    expect(handler.mock.calls[0][0]).toEqual(8);
    expect(handler.mock.calls[0][1]).toEqual(16);
    expect(functionToExecute.mock.calls.length).toEqual(1);
  });

  it('does not return a new function when called twice with the same parameters', () => {
    const handler = jest.fn((x: number, y: number) => undefined);
    const functionToExecute = jest.fn();

    const wrappedFunction1 = executeFunctionAfterHandler(handler, functionToExecute);
    const wrappedFunction2 = executeFunctionAfterHandler(handler, functionToExecute);

    expect(wrappedFunction1).toBe(wrappedFunction2);
  });
});