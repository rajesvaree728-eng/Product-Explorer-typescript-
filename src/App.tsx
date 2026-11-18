import { useEffect, useState } from "react";
import type { Product } from "./product.types";
import{getProducts} from "./productService"

import ProductCard from "./components/ProductCard";

import "./App.css";

function App() {

  // Products state
  const [products, setProducts] = useState<Product[]>([]);

  // Search state
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  // Pagination state
  const [page, setPage] = useState(1);

  const limit = 10;

  // Loading state
  const [loading, setLoading] = useState(false);

  // Error state
  const [error, setError] = useState<string | null>(null);

  // Calculate skip
  const skip = (page - 1) * limit;

  // Total products
  const [total, setTotal] = useState(0);

  // Fetch products
  useEffect(() => {

    const controller = new AbortController();

    async function fetchProducts() {

      try {

        setLoading(true);
        setError(null);

        const data = await getProducts(
          limit,
          skip,
          search,
          controller.signal
        );

        setProducts(data.products);
        setTotal(data.total);

      } catch (err: unknown) {

        if (
          err instanceof Error &&
          err.name === "AbortError"
        ) {
          return;
        }

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }

      } finally {

        if (!controller.signal.aborted) {
          setLoading(false);
        }

      }
    }

    fetchProducts();

    return () => {
      controller.abort();
    };

  }, [page, search]);

  // Search submit
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault();

    setPage(1);
    setSearch(searchInput.trim());

  }

  // Pagination
  const totalPages = Math.ceil(total / limit);

  function nextPage() {
    setPage((prev) => prev + 1);
  }

  function previousPage() {
    setPage((prev) => prev - 1);
  }

  return (

    <div className="app">

      <header className="header">

        <h1>Products Explorer</h1>

        <p>
          Explore products using TypeScript and DummyJSON API
        </p>

      </header>

      {/* Search */}

      <form
        className="search-form"
        onSubmit={handleSearch}
      >

        <input
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <button type="submit">
          Search
        </button>

      </form>

      {/* Product count */}

      <div className="results-info">

        <h2>
          {search ? `Results for "${search}"` : "All Products"}
        </h2>

        <span>
          Total products: {total}
        </span>

      </div>

      {/* Loading */}

      {loading && (
        <p className="status">
          Loading products...
        </p>
      )}

      {/* Error */}

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {/* Products */}

      {!loading && !error && (

        <>

          <div className="products-grid">

            {products.length > 0 ? (

              products.map((product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              ))

            ) : (

              <p>No products found.</p>

            )}

          </div>

          {/* Pagination */}

          {total > 0 && (

            <div className="pagination">

              <button
                onClick={previousPage}
                disabled={page === 1 || loading}
              >
                Previous
              </button>

              <span>
                Page {page} of {totalPages}
              </span>

              <button
                onClick={nextPage}
                disabled={page >= totalPages || loading}
              >
                Next
              </button>

            </div>

          )}

        </>

      )}

    </div>

  );
}

export default App;