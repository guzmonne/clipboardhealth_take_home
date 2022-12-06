const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");

jest.mock("crypto");

const TEST_EVENT = randomString(5);

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the `partitionKey` value of the event if its provided", () => {
    crypto.__setHash(TEST_EVENT);
    const expected = crypto
      .createHash("sha3-512")
      .update(TEST_EVENT)
      .digest("hex");
    const actual = deterministicPartitionKey({ partitionKey: expected });
    expect(actual).toBe(expected);
  });

  it("Returns a stringified version of `partitionKey` value of the event if its provided not as a string", () => {
    const expected = "4";
    const actual = deterministicPartitionKey({ partitionKey: 4 });
    expect(actual).toBe(expected);
  });

  it("Returns a crypto hash if the event doesn't have a `partitionKey`", () => {
    const expected = randomString(5);
    crypto.__setHash(expected);
    const actual = deterministicPartitionKey(randomString(5));
    expect(actual).toBe(expected);
  });

  it("Returns a recalculated crypto hash if the event is to big", () => {
    const expected = randomString(5);
    const long = randomString(100);
    crypto.__setHash(expected);
    crypto.__setHash(long);
    const actual = deterministicPartitionKey(randomString(5));
    expect(actual).toBe(expected);
  });
});

function randomString(length) {
  return [...Array(length)]
    .map(() => (Math.random() * 1000000).toString(36).replace(".", ""))
    .join("");
}
