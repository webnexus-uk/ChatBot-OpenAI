import SelfCloseTag from '../SelfCloseTag';
import { SelfCloseTagOptions } from '../type';
declare class Input extends SelfCloseTag {
    constructor(str: string, tagName: string | undefined, options: SelfCloseTagOptions);
    beforeMergeSpace(): "" | "[x] " | "[ ] ";
    exec(prevGap?: string, endGap?: string): string;
}
export default Input;
