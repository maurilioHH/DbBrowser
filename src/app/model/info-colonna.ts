export interface InfoColonna {
    id: number,
    name: string,
    dataType: string,
    dataLength: number,
    dataPrecision: number,
    dataScale: number,
    nullable: boolean,
    dataDefault: string,
    numDistinct: number,
    comments: string
}    