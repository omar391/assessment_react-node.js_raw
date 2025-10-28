// Mock jsonretype to avoid pulling heavy runtime code during tests
jest.mock("jsonretype", () => {
  // return a function that produces express middleware which is a no-op
  return () => (req, res, next) => next();
});
