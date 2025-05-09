const API_BASE = "https://world.openfoodfacts.org/api/v0";
const API_CACHE = {};

export const fetchProducts = async (
  page = 1,
  searchQuery = "",
  barcodeQuery = "",
  category = ""
) => {
  const cacheKey = `${page}_${searchQuery}_${barcodeQuery}_${category}`;

  if (
    API_CACHE[cacheKey] &&
    Date.now() - API_CACHE[cacheKey].timestamp < 300000
  ) {
    return API_CACHE[cacheKey].data;
  }

  try {
    let url = `${API_BASE}/search.json?page=${page}&page_size=24`;

    if (searchQuery) {
      url += `&search_terms=${encodeURIComponent(searchQuery)}`;
    }

    if (barcodeQuery) {
      url = `${API_BASE}/product/${barcodeQuery}.json`;
      const response = await fetch(url);
      const data = await response.json();
      const result = data.product ? [data.product] : [];
      API_CACHE[cacheKey] = { data: result, timestamp: Date.now() };
      return result;
    }

    if (category) {
      url += `&categories_tags=${encodeURIComponent(category)}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    const result = data.products || [];
    API_CACHE[cacheKey] = { data: result, timestamp: Date.now() };
    return result;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchProductById = async (id) => {
  const cacheKey = `product_${id}`;

  if (
    API_CACHE[cacheKey] &&
    Date.now() - API_CACHE[cacheKey].timestamp < 300000
  ) {
    return API_CACHE[cacheKey].data;
  }

  try {
    const response = await fetch(`${API_BASE}/product/${id}.json`);
    const data = await response.json();
    const result = data.product || null;
    API_CACHE[cacheKey] = { data: result, timestamp: Date.now() };
    return result;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export const fetchCategories = async () => {
  const cacheKey = "categories";

  if (
    API_CACHE[cacheKey] &&
    Date.now() - API_CACHE[cacheKey].timestamp < 3600000
  ) {
    return API_CACHE[cacheKey].data;
  }

  try {
    const response = await fetch(`${API_BASE}/categories.json`);
    const data = await response.json();
    const result = data.tags || [];
    API_CACHE[cacheKey] = { data: result, timestamp: Date.now() };
    return result;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
