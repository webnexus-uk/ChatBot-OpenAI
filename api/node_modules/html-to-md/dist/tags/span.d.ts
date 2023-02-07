import Tag from '../Tag';
import { TagOptions } from '../type';
declare class Span extends Tag {
    constructor(str: string, tagName: string | undefined, options: TagOptions);
    exec(prevGap?: string, endGap?: string): string;
}
export default Span;
