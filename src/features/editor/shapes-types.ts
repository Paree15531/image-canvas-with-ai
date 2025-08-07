export interface CreateShapesMember {
  addCircle: () => void;
  addSquare: () => void;
  addSquareFull: () => void;
  addTriangle: () => void;
  addTriangleRotate: () => void;
}

export const SHAPE_CIRCLE = {
  radius: 150,
  fill: "black",
  stroke: "black",
};

export const SHAPE_SQUARE = {
  width: 100,
  height: 100,
  fill: "black",
  stroke: "black",
};

export const SHAPE_SQUARE_FULL = {
  width: 200,
  height: 200,
  fill: "black",
  stroke: "black",
};

export const SHAPE_TRIANGLE = {
  width: 100,
  height: 100,
  fill: "black",
  stroke: "black",
};

export const SHAPE_TRIANGLE_ROTATE = {
  width: 100,
  height: 100,
  fill: "black",
  stroke: "black",
  rotate: 180,
};
