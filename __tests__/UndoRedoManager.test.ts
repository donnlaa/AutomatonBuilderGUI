import UndoRedoManager, { Action, ActionData } from "../src/UndoRedoManager";

describe("UndoRedoManager", () => {
  beforeEach(() => {
    UndoRedoManager.clear();
  });

  test("pushAction should add action to stack", () => {
    const action = new Action(
      "test",
      "Test Action",
      (data: ActionData) => {},
      (data: ActionData) => {},
      new ActionData()
    );

    UndoRedoManager.pushAction(action);
    expect(UndoRedoManager.getStackLocation()).toBe(0);
    expect(UndoRedoManager.getStack().length).toBe(1);
  });

  test("clear should reset stack and location", () => {
    const action = new Action(
      "test",
      "Test Action",
      (data: ActionData) => {},
      (data: ActionData) => {},
      new ActionData()
    );

    UndoRedoManager.pushAction(action);
    UndoRedoManager.clear();

    expect(UndoRedoManager.getStack().length).toBe(0);
    expect(UndoRedoManager.getStackLocation()).toBe(-1);
  });

  test("undo should decrease stack location", () => {
    const mockForward = jest.fn();
    const mockBackward = jest.fn();

    const action = new Action(
      "test",
      "Test Action",
      mockForward,
      mockBackward,
      new ActionData()
    );

    UndoRedoManager.pushAction(action);
    UndoRedoManager.undo();

    expect(UndoRedoManager.getStackLocation()).toBe(-1);
    expect(mockBackward).toHaveBeenCalled();
  });

  test("redo should increase stack location", () => {
    const mockForward = jest.fn();
    const mockBackward = jest.fn();

    const action = new Action(
      "test",
      "Test Action",
      mockForward,
      mockBackward,
      new ActionData()
    );

    UndoRedoManager.pushAction(action);
    UndoRedoManager.undo();
    UndoRedoManager.redo();

    expect(UndoRedoManager.getStackLocation()).toBe(0);
    expect(mockForward).toHaveBeenCalled();
  });
});
