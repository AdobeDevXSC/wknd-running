import { useState, useEffect } from 'react'
import Image from "next/image"
import { ArrowUpDown, Grid, List, Search, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Import the CSS file
import "./product-list-page.css"

// Mock product data
// const products = [
//   {
//     id: 1,
//     name: "Wireless Bluetooth Headphones",
//     price: 79.99,
//     originalPrice: 99.99,
//     rating: 4.5,
//     reviews: 128,
//     image: "/placeholder.svg?height=300&width=300",
//     badge: "Best Seller",
//     category: "Electronics",
//   },
//   {
//     id: 2,
//     name: "Premium Coffee Beans",
//     price: 24.99,
//     rating: 4.8,
//     reviews: 89,
//     image: "/placeholder.svg?height=300&width=300",
//     badge: "Organic",
//     category: "Food & Beverage",
//   },
//   {
//     id: 3,
//     name: "Ergonomic Office Chair",
//     price: 299.99,
//     originalPrice: 399.99,
//     rating: 4.3,
//     reviews: 67,
//     image: "/placeholder.svg?height=300&width=300",
//     badge: "Sale",
//     category: "Furniture",
//   },
//   {
//     id: 4,
//     name: "Smartphone Case",
//     price: 19.99,
//     rating: 4.2,
//     reviews: 234,
//     image: "/placeholder.svg?height=300&width=300",
//     category: "Accessories",
//   },
//   {
//     id: 5,
//     name: "Fitness Tracker Watch",
//     price: 149.99,
//     originalPrice: 199.99,
//     rating: 4.6,
//     reviews: 156,
//     image: "/placeholder.svg?height=300&width=300",
//     badge: "New",
//     category: "Electronics",
//   },
//   {
//     id: 6,
//     name: "Yoga Mat",
//     price: 39.99,
//     rating: 4.4,
//     reviews: 92,
//     image: "/placeholder.svg?height=300&width=300",
//     category: "Sports",
//   },
//   {
//     id: 7,
//     name: "LED Desk Lamp",
//     price: 59.99,
//     rating: 4.7,
//     reviews: 78,
//     image: "/placeholder.svg?height=300&width=300",
//     badge: "Energy Efficient",
//     category: "Home & Garden",
//   },
//   {
//     id: 8,
//     name: "Wireless Mouse",
//     price: 29.99,
//     originalPrice: 39.99,
//     rating: 4.1,
//     reviews: 145,
//     image: "/placeholder.svg?height=300&width=300",
//     category: "Electronics",
//   },
// ]

export function ProductListPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const query = `query Products($search: String!){
      productSearch(
        phrase: $search
        filter: []
        sort: [{ attribute: "relevance", direction: DESC }]
        page_size: 25
      ) {
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
                roles
              }
            }
          }
        }
      }
    }`;
    const data = JSON.stringify({ query, variables: { search: "" } });
    const url = 'https://na1-sandbox.api.commerce.adobe.com/NZwP3wKPFXBCTLGqxYWZne/graphql';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'AC-View-ID': '426ffe32-e0a9-4c53-8ec9-3f7118cbf6b2',
        'AC-Source-Locale': 'en-US'
      },
      body: data,
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }).then(data => {
      let products = data?.data?.productSearch?.items || [];
      products = products.map(item => {
        item.productView.attributes.forEach(element => {
          if(element.name === 'part_category') {
            item.productView.category = element.value;
          }
        });
        return item.productView
      });
      setProducts(products);

    }).catch(error => {
      console.error('Error fetching products:', error);
    });

  }, []);

  console.log(products);

  return (
    <div className="product-list-page">
      {/* Header */}
      <div className="header">
        <div className="header-container">
          <div className="header-content">
            <div className="header-text">
              <h1 className="header-title">All Products</h1>
              <p className="header-subtitle">Discover our amazing collection</p>
            </div>

            {/* Search and Filters */}
            <div className="filters-container">
              <div className="search-container">
                <Search className="search-icon" />
                <Input placeholder="Search products..." className="search-input" />
              </div>

              <Select>
                <SelectTrigger className="select-trigger category-select">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="home">Home & Garden</SelectItem>
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="sort-button bg-transparent">
                    <ArrowUpDown className="sort-icon" />
                    Sort by
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="sort-dropdown">
                  <DropdownMenuRadioGroup value="featured">
                    <DropdownMenuRadioItem value="featured">Featured</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="price-low">Price: Low to High</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="price-high">Price: High to Low</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="rating">Highest Rated</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Results and View Toggle */}
      <div className="main-content">
        <div className="results-header">
          <p className="results-text">
            Showing <span className="font-medium">1-{products.length}</span> of{" "}
            <span className="font-medium">{products.length}</span> results
          </p>

          <div className="view-toggle">
            <Button variant="outline" size="sm" className="view-button bg-transparent">
              <Grid className="view-icon" />
            </Button>
            <Button variant="ghost" size="sm" className="view-button">
              <List className="view-icon" />
            </Button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {products.map((product) => (
            <Card key={product.sku} className="product-card">
              <CardContent className="product-card-content">
                <div className="product-image-container">
                  <Image
                    src={product.images[0].url || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="product-image"
                  />
                  
                </div>

                <div className="product-info">
                  <div className="product-header">
                    <p className="product-category">{product.category || 'No Category'}</p>
                    <h3 className="product-name">{product.name}</h3>
                  </div>

                  <div className="price-container">
                    <div className="price-info">
                      <span className="current-price">${product.price}</span>
                      {product.price && <span className="original-price">${product.price}</span>}
                    </div>
                    <Button size="sm" className="add-to-cart-btn">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="load-more-container">
          <Button variant="outline" size="lg" className="load-more-btn bg-transparent">
            Load More Products
          </Button>
        </div>
      </div>
    </div>
  )
}
