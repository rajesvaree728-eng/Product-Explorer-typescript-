export interface Product {
    id:number;
    title:string;
    description:string;
    price:number;
    category:string;
    thumbnail:string;
    rating:number;
    stock:number;
    brand ?: string;
}
export interface ProductResponse{
    products:Product[];
    total:number;
    skip:number;
    limit:number;
}
