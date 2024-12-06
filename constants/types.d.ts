declare interface USER{
    id: number;
    username?: string;
    email?: string;
    wallet?: number;
    assets?: ASSET[];
}

declare interface ASSET{
    id: number;
    name?: string;
    value?: number;
    quantity?: number;
    date?: Date;
}


declare interface TRANSACTION{
    id: number;
    sender?: USER;
    receiver?: USER;
    amount?: number;
    date?: Date;
}