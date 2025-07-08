
import { HeroSection as Hero } from "@/components/hero-section/hero-section"
import { ProductCollection } from "@/components/product-collection/product-collection"
import { CategoryGrid } from "@/components/category-grid/category-grid"

export const componentMapping = {
  Hero,
  ProductCollection,
  CategoryGrid
};

export const ModelManager = ({ content, config }) => {
  const type = content._model.title && content._model.title.replace(/ /g, '');
  const Component = componentMapping[type];
 
  if (typeof Component !== 'undefined')
    return <Component content={content} config={config} />;
  else return <p>Neet to add {type} to ModelManager.</p>;
};
