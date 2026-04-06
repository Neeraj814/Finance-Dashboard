import { describe, it, expect } from "vitest";

describe("example", () => {
  it("should pass", () => {
    // Standard assertion logic
    expect(true).toBe(true);
  });

  it("should handle basic math", () => {
    const sum = 1 + 2;
    expect(sum).toBe(3);
  });
});