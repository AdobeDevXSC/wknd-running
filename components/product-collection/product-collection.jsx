import Image from "next/image"
import OptimizedImage from "@/components/optimizedimage"
import { Button } from "@/components/button"
import Link from "next/link"
import './product-collection.css'

export function ProductCollection({ content, config }) {

  const editorProps = {
    'data-aue-resource': `urn:aemconnection:${content?._path}/jcr:content/data/${content?._variation}`,
    'data-aue-type': 'container',
    'data-aue-label': 'Product Collection',
    'data-aue-model': content?._model?._path
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
  const imageProps = {
    'data-aue-prop': 'asset',
    'data-aue-type': 'media',
    'data-aue-label': 'Asset'
  };

  return (
    <section className="product-collection" {...editorProps}>
      {content && content.cardCollection.map((item, index) => {
        const editorProps = {
          'data-aue-resource': `urn:aemconnection:${item?._path}/jcr:content/data/${item?._variation}`,
          'data-aue-type': 'component',
          'data-aue-label': 'Screen',
          'data-aue-model': content?._model?._path
        };

        return (
          <div className="collection-item group" {...editorProps}>
            <OptimizedImage
              asset={item.asset}
              alt={item.title}
              fill
              priority
              className="hero-image"
              sizes="100vw"
              imageSizes={imageSizes}
              config={config}
              imageProps={imageProps}
            />
            {/* <Image src="/person-on-bleachers.png" alt="Person sitting on bleachers" fill className="collection-image" /> */}
            <div className="collection-overlay" />
            <div className="collection-content">
              <h2 className="collection-title" data-aue-prop='title' data-aue-type='text' data-aue-label='Title'>{item.title}</h2>
              <Button variant="outline" className="collection-button">
                <Link href={item._path}>{content.buttonName || 'Shop Now'}</Link>
              </Button>
            </div>
          </div>
        )
      })}
    </section>
  )
}
