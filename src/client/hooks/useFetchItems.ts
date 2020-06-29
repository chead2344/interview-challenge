import useSWR from "swr";
import { MenuItemData } from "../types";

type ResponseData = {
  items: MenuItemData[];
};

async function fetcher(url: string) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

export default function useFetchItems() {
  return useSWR<ResponseData>("/api/items", fetcher);
}
