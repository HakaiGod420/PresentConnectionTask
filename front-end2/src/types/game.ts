export interface BasicGame{
    id:number,
    gameName:string,
    companyName:string,
    price:number,
    releaseDate:  Date
    
}
export interface Game extends BasicGame{
    summary:string
}

export interface CreateGame{
    gameName:string | undefined,
    companyName:string | undefined,
    price:number | undefined,
    summary:string | undefined,
    releaseDate:  Date | undefined,
}