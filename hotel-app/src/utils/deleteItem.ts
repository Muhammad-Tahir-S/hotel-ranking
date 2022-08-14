import { IChain } from "../interfaces/chain";
import { IHotel } from "../interfaces/hotel";

export const deleteItem = (id: string, storeKey: string) => {
  const arr = localStorage.getItem(storeKey);
  const jsonArr = JSON.parse(arr as string) || [];
  const updatedArr = jsonArr.filter((h: IChain | IHotel) => h._id !== id);
  const updatedArrString = JSON.stringify(updatedArr);
  localStorage.setItem(storeKey, updatedArrString);
};
