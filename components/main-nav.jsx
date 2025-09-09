"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image" // Import Image for the product image
import { Search, Heart, ShoppingBag } from "lucide-react"
import { Button } from "@/components/button"
import AEMHeadless from '@adobe/aem-headless-client-js';
import OptimizedImage from "@/components/optimizedimage";
import "./main-nav.css" // Import component-specific CSS

const LinkItem = ({ item, activeMegaMenu, handleMouseEnter, handleMouseLeave, config }) => {
   const imageProps = {
    'data-aue-prop': 'asset',
    'data-aue-type': 'media',
    'data-aue-label': 'Asset'
  };

  const imageSizes = [
    {
      imageWidth: '1600px',
      renditionName: 'web-optimized-xlarge.webp',
    },
    {
      imageWidth: '1200px',
      renditionName: 'web-optimized-xlarge.webp',
    },
    {
      imageWidth: '1000px',
      renditionName: 'web-optimized-large.webp',
    },
    {
      imageWidth: '800px',
      renditionName: 'web-optimized-large.webp',
    },
    {
      imageWidth: '600px',
      renditionName: 'web-optimized-medium.webp',
    },
    {
      imageWidth: '412px',
      renditionName: 'web-optimized-small.webp',
    },
    {
      size: '100vw',
    }
  ];


  if (item.megamenuPanel) {
    return (
      <div className="main-nav-item-with-megamenu" onMouseEnter={() => handleMouseEnter(item.title.toLowerCase())}>
        <Link href="#">{item.title}</Link>
        {activeMegaMenu === item.title.toLowerCase() && (
          <div className="mega-menu-container">
            <div className="mega-menu-image-section">
              <OptimizedImage
                asset={item.megamenuPanel.asset}
                alt={item.title}
                fill
                priority
                sizes="100vw"
                imageSizes={imageSizes}
                config={config}
                imageProps
                className="mega-menu-product-image"
              />
              <div className="mega-menu-image-text" dangerouslySetInnerHTML={{ __html: item.megamenuPanel.imageDescription.html }} /> 
            </div>

            <div className="mega-menu-links-section">
              {item.megamenuPanel.menuColumn.map((link, index) => (
                <div className="mega-menu-column" key={index} dangerouslySetInnerHTML={{ __html: link.html }} />
              ))}
              {/* <div className="mega-menu-column">
                <h4>Shoes</h4>
                <ul>
                  <li>
                    <Link href="#">Running Shoes</Link>
                  </li>
                  <li>
                    <Link href="#">Training Shoes</Link>
                  </li>
                  <li>
                    <Link href="#">Lifestyle Shoes</Link>
                  </li>
                  <li>
                    <Link href="#">Trail Shoes</Link>
                  </li>
                </ul>
              </div>
              <div className="mega-menu-column">
                <h4>Clothing</h4>
                <ul>
                  <li>
                    <Link href="#">Tops & T-Shirts</Link>
                  </li>
                  <li>
                    <Link href="#">Shorts</Link>
                  </li>
                  <li>
                    <Link href="#">Pants & Tights</Link>
                  </li>
                  <li>
                    <Link href="#">Jackets & Vests</Link>
                  </li>
                </ul>
              </div>
              <div className="mega-menu-column">
                <h4>Accessories</h4>
                <ul>
                  <li>
                    <Link href="#">Socks</Link>
                  </li>
                  <li>
                    <Link href="#">Hats & Headbands</Link>
                  </li>
                  <li>
                    <Link href="#">Bags</Link>
                  </li>
                  <li>
                    <Link href="#">Gloves</Link>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        )}
      </div>
    )
  }
  else {
    return (
      <Link href={item._path} className="main-nav-item">
        {item.title}
      </Link>
    );
  }
  // return (
  //   <div className="main-nav-item-with-megamenu" onMouseEnter={() => handleMouseEnter("men")}>
  //     <Link href="#">Men</Link>
  //     {activeMegaMenu === "men" && (
  //       <div className="mega-menu-container">
  //         <div className="mega-menu-image-section">
  //           <Image
  //             src="/placeholder-9a2a4.png"
  //             alt="Men's Running Shoes"
  //             width={300}
  //             height={400}
  //             className="mega-menu-product-image"
  //           />
  //           <div className="mega-menu-image-text">
  //             <h3>Men's Best Sellers</h3>
  //             <p>Discover top-rated gear for your run.</p>
  //             <Button variant="outline" className="mega-menu-shop-button">
  //               Shop Men's
  //             </Button>
  //           </div>
  //         </div>
  //         <div className="mega-menu-links-section">
  //           <div className="mega-menu-column">
  //             <h4>Shoes</h4>
  //             <ul>
  //               <li>
  //                 <Link href="#">Running Shoes</Link>
  //               </li>
  //               <li>
  //                 <Link href="#">Training Shoes</Link>
  //               </li>
  //               <li>
  //                 <Link href="#">Lifestyle Shoes</Link>
  //               </li>
  //               <li>
  //                 <Link href="#">Trail Shoes</Link>
  //               </li>
  //             </ul>
  //           </div>
  //           <div className="mega-menu-column">
  //             <h4>Clothing</h4>
  //             <ul>
  //               <li>
  //                 <Link href="#">Tops & T-Shirts</Link>
  //               </li>
  //               <li>
  //                 <Link href="#">Shorts</Link>
  //               </li>
  //               <li>
  //                 <Link href="#">Pants & Tights</Link>
  //               </li>
  //               <li>
  //                 <Link href="#">Jackets & Vests</Link>
  //               </li>
  //             </ul>
  //           </div>
  //           <div className="mega-menu-column">
  //             <h4>Accessories</h4>
  //             <ul>
  //               <li>
  //                 <Link href="#">Socks</Link>
  //               </li>
  //               <li>
  //                 <Link href="#">Hats & Headbands</Link>
  //               </li>
  //               <li>
  //                 <Link href="#">Bags</Link>
  //               </li>
  //               <li>
  //                 <Link href="#">Gloves</Link>
  //               </li>
  //             </ul>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // )
}

export function MainNav({ config, locale = 'en' }) {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState(null) // To track which mega menu is open
  const [content, setContent] = useState([]);

  useEffect(() => {
    const randomNumber = Math.random().toString(36).substring(2, 15)
    const { env, project } = config;
    if (env && project) {
      const sdk = new AEMHeadless({
        serviceURL: env,
        endpoint: '/graphql/execute.json',
        fetch: ((resource, options = {}) => {
          if (resource.startsWith('https://author-'))
            options.credentials = 'include';
          return window.fetch(resource, options);
        })
      });

      sdk.runPersistedQuery('v0/screenNavigation', { project: `/content/dam/${project}`, locale: locale })
        .then(({ data }) => {
          if (data) {
            setContent(data.screenList.items);
          }
        })
        .catch((error) => {
          console.log(`Error with screen request. ${error.message}`);
        });
    }
  }, [config]);

  const handleMouseEnter = (menuName) => {
    setIsMegaMenuOpen(true)
    setActiveMegaMenu(menuName)
  }

  const handleMouseLeave = () => {
    setIsMegaMenuOpen(false)
    setActiveMegaMenu(null)
  }

  return (
    <header className="main-header">
      {/* Logo */}
      <Link href="/" className="main-header-logo">
        wknd.running
      </Link>

      {/* Navigation - now correctly centered */}
      <nav className="main-nav" onMouseLeave={handleMouseLeave}>
        {content && content.map((item, index) => (
          <LinkItem key={index} item={item} config={config} activeMegaMenu={activeMegaMenu} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
        ))}
        {/* <Link href="#" className="main-nav-item">
          New
        </Link>
        <div className="main-nav-item-with-megamenu" onMouseEnter={() => handleMouseEnter("men")}>
          <Link href="#">Men</Link>
          {activeMegaMenu === "men" && (
            <div className="mega-menu-container">
              <div className="mega-menu-image-section">
                <Image
                  src="/placeholder-9a2a4.png"
                  alt="Men's Running Shoes"
                  width={300}
                  height={400}
                  className="mega-menu-product-image"
                />
                <div className="mega-menu-image-text">
                  <h3>Men's Best Sellers</h3>
                  <p>Discover top-rated gear for your run.</p>
                  <Button variant="outline" className="mega-menu-shop-button">
                    Shop Men's
                  </Button>
                </div>
              </div>
              <div className="mega-menu-links-section">
                <div className="mega-menu-column">
                  <h4>Shoes</h4>
                  <ul>
                    <li>
                      <Link href="#">Running Shoes</Link>
                    </li>
                    <li>
                      <Link href="#">Training Shoes</Link>
                    </li>
                    <li>
                      <Link href="#">Lifestyle Shoes</Link>
                    </li>
                    <li>
                      <Link href="#">Trail Shoes</Link>
                    </li>
                  </ul>
                </div>
                <div className="mega-menu-column">
                  <h4>Clothing</h4>
                  <ul>
                    <li>
                      <Link href="#">Tops & T-Shirts</Link>
                    </li>
                    <li>
                      <Link href="#">Shorts</Link>
                    </li>
                    <li>
                      <Link href="#">Pants & Tights</Link>
                    </li>
                    <li>
                      <Link href="#">Jackets & Vests</Link>
                    </li>
                  </ul>
                </div>
                <div className="mega-menu-column">
                  <h4>Accessories</h4>
                  <ul>
                    <li>
                      <Link href="#">Socks</Link>
                    </li>
                    <li>
                      <Link href="#">Hats & Headbands</Link>
                    </li>
                    <li>
                      <Link href="#">Bags</Link>
                    </li>
                    <li>
                      <Link href="#">Gloves</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="main-nav-item-with-megamenu" onMouseEnter={() => handleMouseEnter("women")}>
          <Link href="#">Women</Link>
          {activeMegaMenu === "women" && (
            <div className="mega-menu-container">
              <div className="mega-menu-image-section">
                <Image
                  src="/women-running-apparel.png"
                  alt="Women's Running Apparel"
                  width={300}
                  height={400}
                  className="mega-menu-product-image"
                />
                <div className="mega-menu-image-text">
                  <h3>Women's Essentials</h3>
                  <p>Gear up for your next personal best.</p>
                  <Button variant="outline" className="mega-menu-shop-button">
                    Shop Women's
                  </Button>
                </div>
              </div>
              <div className="mega-menu-links-section">
                <div className="mega-menu-column">
                  <h4>Shoes</h4>
                  <ul>
                    <li>
                      <Link href="#">Running Shoes</Link>
                    </li>
                    <li>
                      <Link href="#">Training Shoes</Link>
                    </li>
                    <li>
                      <Link href="#">Lifestyle Shoes</Link>
                    </li>
                    <li>
                      <Link href="#">Trail Shoes</Link>
                    </li>
                  </ul>
                </div>
                <div className="mega-menu-column">
                  <h4>Clothing</h4>
                  <ul>
                    <li>
                      <Link href="#">Sports Bras</Link>
                    </li>
                    <li>
                      <Link href="#">Leggings & Tights</Link>
                    </li>
                    <li>
                      <Link href="#">Tops & Tanks</Link>
                    </li>
                    <li>
                      <Link href="#">Shorts & Skirts</Link>
                    </li>
                  </ul>
                </div>
                <div className="mega-menu-column">
                  <h4>Accessories</h4>
                  <ul>
                    <li>
                      <Link href="#">Socks</Link>
                    </li>
                    <li>
                      <Link href="#">Water Bottles</Link>
                    </li>
                    <li>
                      <Link href="#">Bags</Link>
                    </li>
                    <li>
                      <Link href="#">Hair Accessories</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <Link href="#" className="main-nav-item">
          Kids
        </Link>
        <Link href="#" className="main-nav-item">
          Running
        </Link>
        <Link href="#" className="main-nav-item">
          Sport
        </Link> */}
      </nav>

      {/* Right-aligned icons */}
      <div className="header-icons">
        <div className="search-input-container">
          <Search className="search-icon" />
          <input type="text" placeholder="Search" className="search-input" />
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Heart className="h-5 w-5" />
          <span className="sr-only">Favorites</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <ShoppingBag className="h-5 w-5" />
          <span className="sr-only">Cart</span>
        </Button>
        <Button variant="ghost" size="icon" className="menu-button-mobile">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
    </header>
  )
}
