import OptimizedImage from "@/components/optimizedimage"
import { Button } from "@/components/button"

export function HeroSection({ content, config }) {
  const { title, subHeadline, buttonText, buttonUrl, asset } = content
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


  const editorProps = {
    'data-aue-resource': `urn:aemconnection:${content?._path}/jcr:content/data/master`,
    'data-aue-type': 'reference',
    'data-aue-label': 'Hero',
    'data-aue-model': content?._model?._path
  };

  const imageProps = {
    'data-aue-prop': 'asset',
    'data-aue-type': 'media',
    'data-aue-label': 'Asset'
  };


  return (
    <section className="hero-section" {...editorProps}>
      <OptimizedImage
        asset={asset}
        alt={title}
        fill
        priority
        className="hero-image"
        sizes="100vw"
        imageSizes={imageSizes}
        config={config}
        imageProps
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="hero-subheadline" data-aue-prop='subHeadline' data-aue-type='text' data-aue-label='Title'>{subHeadline}</p>
        <h1 className="hero-headline" data-aue-prop='title' data-aue-type='text' data-aue-label='Title'>{title}</h1>
        <Button className="hero-button" data-aue-prop='buttonText' data-aue-type='text' data-aue-label='Button Text'>{buttonText}</Button>
      </div>
    </section>
  )
}
