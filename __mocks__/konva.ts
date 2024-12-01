export const Stage = jest.fn().mockImplementation(() => ({
  add: jest.fn(),
  width: jest.fn(),
  height: jest.fn(),
  draw: jest.fn(),
}));

export const Layer = jest.fn().mockImplementation(() => ({
  add: jest.fn(),
  draw: jest.fn(),
}));

export const Line = jest.fn().mockImplementation(() => ({
  points: jest.fn(),
  stroke: jest.fn(),
}));
