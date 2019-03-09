import {none, Some} from 'fp-ts/lib/Option';
import * as unsafeAssert from 'assert';

import {ok, AssertionError} from '../src';

describe('assert', () => {
  it('should be none when truthy is given', () => {
    unsafeAssert.deepStrictEqual(ok(true), none);
    unsafeAssert.deepStrictEqual(ok('non empty string'), none);
    unsafeAssert.deepStrictEqual(ok(1 /* non 0 number */), none);
    unsafeAssert.deepStrictEqual(ok([]), none);
    unsafeAssert.deepStrictEqual(ok({}), none);
    unsafeAssert.deepStrictEqual(ok(() => {}), none);
  });

  it('should be some AssertionError when falsy is given', () => {
    const falsies = [false, null, undefined, 0, NaN, ''];

    falsies.forEach(falsy => {
      unsafeAssert.ok(ok(falsy).toNullable() instanceof AssertionError);
      unsafeAssert.ok(ok(falsy) instanceof Some);
    });
  });
});
