export interface IHotel {
  _id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  chain?: string;
  rating?: 20 | 40 | 60 | 80 | 100 | "20" | "40" | "60" | "80" | "100";
  price: string;
  imgUrl?: string;
}
