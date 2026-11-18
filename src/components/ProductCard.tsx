import type { Product } from "../product.types";

interface ProductCardProps{
    product: Product;
}
function ProductCard({product}:ProductCardProps){
    return (
        <div className="product-card">
            <img src={product.thumbnail}
            alt ={product.title} className ="product-image" />
        <div className="product-info">
            <span className="category">
                {product.category}
            </span>
            <h3>{product.title}</h3>
            <p className="description">{product.description}</p>
            <div className="product-details">
                <strong>${product.price}</strong>
                <span>
                    Rating:{product.rating}
                </span>
            </div>
            <p className="stock">
                {product.stock > 0
            ? `${product.stock} items available`
            : "Out of stock"}
            </p>
        </div>
        </div>
    )
}
export default ProductCard;