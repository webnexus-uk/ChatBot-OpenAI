import { TagOptions } from '../type';
import Em from './em';
declare class I extends Em {
    constructor(str: string, tagName: string | undefined, options: TagOptions);
    exec(prevGap: string, endGap: string): string;
}
export default I;
