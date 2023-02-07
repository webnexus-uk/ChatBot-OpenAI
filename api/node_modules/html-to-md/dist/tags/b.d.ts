import { TagOptions } from '../type';
import Strong from './strong';
declare class B extends Strong {
    constructor(str: string, tagName: string | undefined, options: TagOptions);
    exec(prevGap: string, endGap: string): string;
}
export default B;
