declare interface USER{
    id: number;
    username?: string;
    email?: string;
    wallet?: number;
    assets?: ASSET[];
}

declare interface Asset {
  assetId: string;
  assetName: string;
  totalSupply: number | string;
  pricePerShare:number | string;
  details: string;
  holders: any[];
}


declare interface TRANSACTION{
    id: number;
    sender?: USER;
    receiver?: USER;
    amount?: number;
    date?: Date;
}