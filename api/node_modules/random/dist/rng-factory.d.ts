import RNG from './rng';
/**
 * Construct an RNG with variable inputs. Used in calls to Random constructor
 * @param {...*} args - Distribution-specific arguments
 * @return RNG
 *
 * @example
 * new Random(RNGFactory(...args))
 */
declare const _default: <T extends any[]>(...args: T) => RNG;
export default _default;
