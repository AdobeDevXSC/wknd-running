import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/button'
import { mapJsonRichText } from '@/lib/renderRichText'
import './category-grid.css'

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
      <h2 className='category-grid-title' data-aue-prop='headline' data-aue-type='richtext' data-aue-label='Headline'>{mapJsonRichText(content?.headline.json)}</h2>
      <div className='category-items'>
        {categories.map((category) => (
          <GridItem key={category.name} category={category} />
        ))}
      </div>
    </section>
  )
}

const GridItem = ({ category }) => {
  return (
    <div key={category.name} className='category-item group'>
      <Image src={category.image || '/placeholder.svg'} alt={category.alt} fill className='category-item-image' />
      <div className='category-item-overlay' />
      <div className='category-item-content'>
        <h3 className='category-item-title'>{category.name}</h3>
        <Button asChild variant='outline' className='category-item-button'>
          <Link href={category.href}>Shop Now</Link>
        </Button>
      </div>
    </div>
  )
}
