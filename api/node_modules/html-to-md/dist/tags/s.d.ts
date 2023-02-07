import Del from './del';
declare class S extends Del {
    constructor(str: string, tagName?: string);
    exec(prevGap: string, endGap: string): string;
}
export default S;
