const crypto = require("crypto");

/**
 * Default partition key used when an event isn't provided.
 */
const TRIVIAL_PARTITION_KEY = "0";
/**
 * Maximum length for the partition key.
 */
const MAX_PARTITION_KEY_LENGTH = 256;

/**
 * Returns a deterministic partition key for the provided event.
 *
 * @example
 * ```javascript
 * deterministicPartitionKey();
 * // "0"
 * deterministicPartitionKey({ partitionKey: 1 });
 * // "1"
 * deterministicPartitionKey({ partitionKey: 'example' });
 * // "<hash>"
 * ```
 *
 * @param {any} event Event from which to determine the `partitionKey`
 */
exports.deterministicPartitionKey = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  let candidate = event.partitionKey
    ? event.partitionKey
    : crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate;
};
