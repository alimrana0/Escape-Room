import { knapsack } from "./knapsack";

describe("knapsack", () => {
  it("calculates the result correctly", () => {
    let songs = [
      { duration_ms: 180000, id: "1", popularity: 50 },
      { duration_ms: 120000, id: "2", popularity: 70 },
      { duration_ms: 360000, id: "3", popularity: 90 },
    ];

    let res = knapsack(songs, 660);
    expect(res).toHaveLength(3);
  });
});
