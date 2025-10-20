import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/button'
import { mapJsonRichText } from '@/lib/renderRichText'
import './category-grid.css'
import OptimizedImage from '@/components/optimizedimage'

export function CategoryGrid({ content, config }) {
  const categories = [
    {
      name: 'Men',
      image: '/category-men.png',
      alt: 'Man running on a track',
      href: '#',
    },
    {
      name: 'Women',
      image: '/category-women.png',
      alt: 'Woman stretching before a run',
      href: '#',
    },
    {
      name: 'Casual',
      image: '/category-casual.png',
      alt: 'Person walking in casual sportswear',
      href: '#',
    },
    {
      name: 'Running',
      image: '/category-running.png',
      alt: 'Close-up of running shoes',
      href: '#',
    },
  ]

  const editorProps = {
    'data-aue-resource': `urn:aemconnection:${content?._path}/jcr:content/data/${content?._variation}`,
    'data-aue-type': 'reference',
    'data-aue-label': 'Category Grid',
    'data-aue-model': content?._model?._path
  };

  console.log(content);
  return (
    <section className='category-grid' {...editorProps}>
      <h2 className='category-grid-title' data-aue-prop='headline' data-aue-type='richtext' data-aue-label='Headline'>{mapJsonRichText(content?.headline?.json)}</h2>
      <div className='category-items'>
        {content.categories.map((category) => (
          <GridItem key={category.title} category={category} config={config} />
        ))}
      </div>
    </section>
  )
}

const GridItem = ({ category, config }) => {
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
    <div key={category.name} className='category-item group'>
      {/* <Image src={category.as || '/placeholder.svg'} alt={category.alt} fill className='category-item-image' /> */}
      <OptimizedImage
        asset={category.asset}
        alt={category.title}
        fill
        priority
        className="hero-image"
        sizes="100vw"
        imageSizes={imageSizes}
        config={config}
        imageProps={imageProps}
      />
      <div className='category-item-overlay' />
      <div className='category-item-content'>
        <h3 className='category-item-title'>{category.title}</h3>
        <Button asChild variant='outline' className='category-item-button'>
          <Link href={'/'}>Shop Now</Link>
        </Button>
      </div>
    </div>
  )
}
