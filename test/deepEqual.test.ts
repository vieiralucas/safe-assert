import {none, Some} from 'fp-ts/lib/Option';
import * as unsafeAssert from 'assert';

import {deepEqual, AssertionError} from '../src';

describe('deepEqual', () => {
  it('should be none when two values are deeply equal', () => {
    [
      {
        actual: true,
        expected: true,
      },
      {
        actual: false,
        expected: false,
      },
      {
        actual: 'non empty string',
        expected: 'non empty string',
      },
      {
        actual: '',
        expected: '',
      },
      {
        actual: 1,
        expected: 1,
      },
      {
        actual: 0,
        expected: 0,
      },
      {
        actual: -1,
        expected: -1,
      },
      {
        actual: Infinity,
        expected: Infinity,
      },
      {
        actual: -Infinity,
        expected: -Infinity,
      },
      {
        actual: [],
        expected: [],
      },
      {
        actual: {},
        expected: {},
      },
      {
        actual: {a: 1},
        expected: {a: 1},
      },
      {
        actual: {a: {b: 1}},
        expected: {a: {b: 1}},
      },
    ].forEach(({actual, expected}) => {
      unsafeAssert.deepStrictEqual(deepEqual(actual, expected), none);
    });
  });

  it('should be some AssertionError when values are not deeply equal', () => {
    const cases = [
      {
        actual: true,
        expected: false,
      },
      {
        actual: false,
        expected: true,
      },
      {
        actual: [1],
        expected: [],
      },
      {
        actual: {a: 1},
        expected: {a: 2},
      },
      {
        actual: {a: {b: 1}},
        expected: {a: {c: 2}},
      },
      {actual: NaN, expected: NaN},
    ];

    cases.forEach(({actual, expected}) => {
      unsafeAssert.ok(
        deepEqual(actual, expected) instanceof Some,
        'Expected it to be instanceof Some',
      );
      unsafeAssert.ok(
        deepEqual(actual, expected).toNullable() instanceof AssertionError,
      );
    });
  });
});
