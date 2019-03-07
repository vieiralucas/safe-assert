import {none, Some} from 'fp-ts/lib/Option';
import * as unsafeAssert from 'assert';

import {assert, AssertionError} from '../src';

describe('assert', () => {
  it('should be none when truthy is given', () => {
    unsafeAssert.deepStrictEqual(assert(true), none);
    unsafeAssert.deepStrictEqual(assert('non empty string'), none);
    unsafeAssert.deepStrictEqual(assert(1 /* non 0 number */), none);
    unsafeAssert.deepStrictEqual(assert([]), none);
    unsafeAssert.deepStrictEqual(assert({}), none);
    unsafeAssert.deepStrictEqual(assert(() => {}), none);
  });

  it('should be some AssertionError when falsy is given', () => {
    const falsies = [false, null, undefined, 0, NaN, ''];

    falsies.forEach(falsy => {
      unsafeAssert.ok(assert(falsy).toNullable() instanceof AssertionError);
      unsafeAssert.ok(assert(falsy) instanceof Some);
    });
  });
});
