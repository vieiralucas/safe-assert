import * as unsafeAssert from 'assert';
import {Option, none, some} from 'fp-ts/lib/Option';

export {AssertionError} from 'assert';

export type Assertions = {
  ok: (
    value: unknown,
    message?: string | Error,
  ) => Option<unsafeAssert.AssertionError>;
  deepEqual: (
    actual: unknown,
    expected: unknown,
    message?: string | Error | undefined,
  ) => Option<unsafeAssert.AssertionError>;
  deepStrictEqual: (
    actual: unknown,
    expected: unknown,
    message?: string | Error | undefined,
  ) => Option<unsafeAssert.AssertionError>;
  equal: (
    actual: unknown,
    expected: unknown,
    message?: string | Error | undefined,
  ) => Option<unsafeAssert.AssertionError>;
  notDeepEqual: (
    actual: unknown,
    expected: unknown,
    message?: string | Error | undefined,
  ) => Option<unsafeAssert.AssertionError>;
  notDeepStrictEqual: (
    actual: unknown,
    expected: unknown,
    message?: string | Error | undefined,
  ) => Option<unsafeAssert.AssertionError>;
  notEqual: (
    actual: unknown,
    expected: unknown,
    message?: string | Error | undefined,
  ) => Option<unsafeAssert.AssertionError>;
  notStrictEqual: (
    actual: unknown,
    expected: unknown,
    message?: string | Error | undefined,
  ) => Option<unsafeAssert.AssertionError>;
  strictEqual: (
    actual: unknown,
    expected: unknown,
    message?: string | Error | undefined,
  ) => Option<unsafeAssert.AssertionError>;
  throws: (
    block: Function,
    error: RegExp | Function | Object | Error,
    message?: string | Error,
  ) => Option<unsafeAssert.AssertionError>;
};

type assert2Args = (value: unknown, message?: string | Error) => void;

const tryCatch2 = (unsafeAssertFn: assert2Args) => (
  value: unknown,
  message?: string | Error,
): Option<unsafeAssert.AssertionError> => {
  try {
    unsafeAssertFn(value, message);
    return none;
  } catch (err) {
    return some(err);
  }
};

type assert3Args = (
  actual: unknown,
  expected: unknown,
  message?: string | Error,
) => void;

const tryCatch3 = (unsafeAssertFn: assert3Args) => (
  actual: unknown,
  expected: unknown,
  message?: string | Error | undefined,
): Option<unsafeAssert.AssertionError> => {
  try {
    unsafeAssertFn(actual, expected, message);
    return none;
  } catch (err) {
    return some(err);
  }
};

export const ok = tryCatch2(unsafeAssert);

export const deepEqual = tryCatch3(unsafeAssert.deepEqual);

export const deepStrictEqual = tryCatch3(unsafeAssert.deepStrictEqual);

export const equal = tryCatch3(unsafeAssert.equal);

export const fail = (
  message?: string | Error | undefined,
): unsafeAssert.AssertionError => {
  try {
    unsafeAssert.fail(message);

    // should never reach this
    if (message instanceof Error) {
      throw new unsafeAssert.AssertionError({message: message.message});
    }
    throw new unsafeAssert.AssertionError({message});
  } catch (err) {
    return err;
  }
};

export const ifError = (
  value: unknown,
): Option<unsafeAssert.AssertionError> => {
  try {
    unsafeAssert.ifError(value);
    return none;
  } catch (err) {
    return some(err);
  }
};

export const notDeepEqual = tryCatch3(unsafeAssert.notDeepEqual);

export const notDeepStrictEqual = tryCatch3(unsafeAssert.notDeepStrictEqual);

export const notEqual = tryCatch3(unsafeAssert.notEqual);

export const notStrictEqual = tryCatch3(unsafeAssert.notStrictEqual);

export const strictEqual = tryCatch3(unsafeAssert.strictEqual);

export const throws = (
  block: Function,
  error: RegExp | Function | Object | Error,
  message?: string | Error,
): Option<unsafeAssert.AssertionError> => {
  try {
    unsafeAssert.throws(block, error, message);
    return none;
  } catch (err) {
    return some(err);
  }
};

const assertions: Assertions = {
  ok,
  deepEqual,
  deepStrictEqual,
  equal,
  notDeepEqual,
  notDeepStrictEqual,
  notEqual,
  notStrictEqual,
  strictEqual,
  throws,
};

export default assertions;
