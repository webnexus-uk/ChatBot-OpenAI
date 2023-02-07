import SelfCloseTag from '../SelfCloseTag';
import { TagOptions } from '../type';
declare class Br extends SelfCloseTag {
    constructor(str: string, tagName: string | undefined, options: TagOptions);
    exec(prevGap: string, endGap?: string): string;
}
export default Br;
