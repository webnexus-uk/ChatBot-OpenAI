declare type TrimType = 'whitespace' | 'linebreak' | 'all';
declare type OriType = 'left' | 'right' | 'all';
declare type TrimOptions = {
    type?: TrimType;
    ori?: OriType;
};
declare function trim(str: string, { type, ori }?: TrimOptions): string;
export default trim;
