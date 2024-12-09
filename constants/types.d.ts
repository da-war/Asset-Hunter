declare interface USER{
    userId: string;
    username?: string;
    email?: string;
    wallet?: number;
    assets?: ASSET[];
}

declare interface Asset {
  assetId: string;
  assetName: string;
  totalSupply:string;
  pricePerShare:string;
  details: string;
  holders: any[];
}


declare interface Transaction {
  transactionId: string;
  asset: string;
  quantity: number;
  from?: string;
  to?: string;
  time: Date; // Ensure time is stored as a Date object
    status: 'pending' | 'completed' | 'cancelled';
    transactionStakeHolders: string[];
}