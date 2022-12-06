const crypto = jest.createMockFromModule("crypto");

const hashes = [];

// Function to create the output of the createHasy chained function.
function __setHash(hash) {
  hashes.push(hash);
}

// A custom version of `createHash` that reads from the special mocked out
// HASH value set via __setMockFiles.
function createHash() {
  return {
    update: () => ({
      digest: () => hashes.pop(),
    }),
  };
}

crypto.__setHash = __setHash;
crypto.createHash = createHash;

module.exports = crypto;
