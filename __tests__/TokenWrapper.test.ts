import TokenWrapper from "../src/TokenWrapper";

describe("TokenWrapper", () => {
  describe("constructor", () => {
    test("creates with default values when no parameters provided", () => {
      const token = new TokenWrapper();
      expect(token.symbol).toBe("");
      expect(token.id).toBeDefined();
    });

    test("creates with given symbol", () => {
      const token = new TokenWrapper("a");
      expect(token.symbol).toBe("a");
    });

    test("creates with given id", () => {
      const customId = "123";
      const token = new TokenWrapper("a", customId);
      expect(token.id).toBe(customId);
    });
  });

  describe("id", () => {
    test("generates unique ids for different tokens", () => {
      const token1 = new TokenWrapper("a");
      const token2 = new TokenWrapper("b");
      expect(token1.id).not.toBe(token2.id);
    });

    test("maintains id when symbol changes", () => {
      const token = new TokenWrapper("a");
      const originalId = token.id;
      token.symbol = "b";
      expect(token.id).toBe(originalId);
    });
  });

  describe("toJSON", () => {
    test("serializes correctly", () => {
      const token = new TokenWrapper("a");
      const json = token.toJSON();
      expect(json).toEqual({
        id: token.id,
        symbol: "a",
      });
    });
  });
});
