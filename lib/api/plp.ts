import { ACO_URL, CATALOG_VIEW_ID, DEFAULT_LOCALE } from "../constants";

const PRODUCT_SEARCH_QUERY = `query Products($search: String!, $pageSize: Int!, $currentPage: Int!){
  productSearch(
    phrase: $search
    filter: []
    sort: [{ attribute: "relevance", direction: DESC }]
    page_size: $pageSize
    current_page: $currentPage
  ) {
    total_count
    items {
      productView {
        sku
        name
        description
        shortDescription
        images {
          url
        }
        ... on SimpleProductView {
          attributes {
            label
            name
            value
          }
          price {
            regular {
              amount {
                value
                currency
              }
            }
            final {
              amount {
                value
                currency
              }
            }
            roles
          }
        }
      }
    }
  }
}`;

export type ProductSearchResult = {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  products: Product[];
};

export type Product = {
  sku: string;
  name: string;
  description: string;
  shortDescription: string;
  images: { url: string }[];
  attributes: { label: string; name: string; value: string }[];
  price: {
    regular: { amount: { value: number; currency: string } };
    final: { amount: { value: number; currency: string } };
  };
};

export async function searchProducts(
  viewId: string = CATALOG_VIEW_ID,
  locale: string = DEFAULT_LOCALE,
  priceBookId: string = "wknd_global",
  searchTerm: string = "",
  pageSize: number = 25,
  currentPage: number = 1
): Promise<ProductSearchResult> {
  try {
    const headers = {
      "Content-Type": "application/json",
      "AC-View-ID": viewId,
      "AC-Source-Locale": locale,
      "AC-Price-Book-ID": priceBookId,
    };

    const data = JSON.stringify({
      query: PRODUCT_SEARCH_QUERY,
      variables: {
        search: searchTerm,
        pageSize: pageSize,
        currentPage: currentPage,
      },
    });

    const response = await fetch(ACO_URL, {
      method: "POST",
      headers: headers,
      body: data,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    let products = result?.data?.productSearch?.items || [];

    // Add a top-level category property from the item_category attribute
    products = products.map((item: any) => {
      item.productView.attributes.forEach((element: any) => {
        console.log(element);
        if (element.name === "item_category") {
          item.productView.category = element.value;
        }
      });
      return item.productView;
    });

    return {
      totalCount: result?.data?.productSearch?.total_count,
      currentPage: result?.data?.productSearch?.current_page,
      pageSize: result?.data?.productSearch?.page_size,
      products: products,
    };
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
}
