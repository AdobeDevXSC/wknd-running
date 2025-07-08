import Image from "next/image"
import { Button } from "@/components/button"
import './product-collection.css'

export function ProductCollection({content, config}) {
  
   const editorProps = {
    'data-aue-resource': `urn:aemconnection:${content?._path}/jcr:content/data/${content?._variation}`,
    'data-aue-type': 'reference',
    'data-aue-label': 'Product Collection',
    'data-aue-model': content?._model?._path
  };

  return (
    <section className="product-collection" {...editorProps}>
      <div className="collection-item group">
        <Image src="/person-on-bleachers.png" alt="Person sitting on bleachers" fill className="collection-image" />
        <div className="collection-overlay" />
        <div className="collection-content">
          <h2 className="collection-title">New Arrivals</h2>
          <Button variant="outline" className="collection-button">
            Shop Now
          </Button>
        </div>
      </div>
      <div className="collection-item group">
        <Image src="/person-stadium.png" alt="Person sitting in a stadium" fill className="collection-image" />
        <div className="collection-overlay" />
        <div className="collection-content">
          <h2 className="collection-title">Running Gear</h2>
          <Button variant="outline" className="collection-button">
            Explore
          </Button>
        </div>
      </div>
    </section>
  )
}
