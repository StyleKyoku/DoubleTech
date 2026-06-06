import React from "react";
import { getProducts } from "../api/productsApi";

const ProductContext = React.createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = React.useState([]);
  const [productsLoading, setProductsLoading] = React.useState(true);
  const [productsError, setProductsError] = React.useState(null);

  const loadProducts = React.useCallback(async () => {
    try {
      setProductsLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      setProductsError(error.message);
      console.error("Error fetching products:", error);
    } finally {
      setProductsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const productById = React.useMemo(() => {
    return products.reduce((acc, product) => {
      acc[product.id] = product;
      return acc;
    }, {});
  }, [products]);

  const value = React.useMemo(
    () => ({
      products,
      productById,
      loadProducts,
      productsLoading,
      productsError,
    }),
    [products, productById, loadProducts, productsLoading, productsError],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = React.useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
