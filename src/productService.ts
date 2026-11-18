import type { ProductResponse } from "./product.types";

const BASE_URL = "https://dummyjson.com";

export async function getProducts(
    limit:number,
    skip:number,
    search:string,
    signal ?:AbortSignal
) : Promise<ProductResponse> {
const endpoint = search 
 ? `/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
    : `/products?limit=${limit}&skip=${skip}`;

    const response = await fetch(
            `${BASE_URL}${endpoint}`,
            {signal}
    );
    if (!response.ok){
        throw new Error(
                  `HTTP Error: ${response.status}`
        )
    }
    const data :ProductResponse = await response.json();
    return data;
}