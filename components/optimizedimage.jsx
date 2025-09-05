import Image from 'next/image'

const OptimizedImage = ({ asset, alt, fill, priority, className, sizes, imageSizes, config, imageProps }) => {
  // Default is false
  console.log("asset", asset, alt);
  const { _dynamicUrl, _authorUrl } = asset;
  const src = _dynamicUrl || _authorUrl;
  return (
    <picture>
      <Image
        src={config.env + src}
        alt={alt || 'Image'}
        fill={fill || false}
        priority={priority || false}
        className={className || ''}
        sizes={sizes || sizes(imageSizes)}
        srcSet={srcSet(config.env + src, imageSizes)}
        optimized="true"
        {...imageProps}
       />
    </picture>
  );
}

const sizes = (definitions = []) => {
  return definitions
    .filter((definition) => definition.size)
    .map((definition) => definition.size)
    .join(', ');
}

const srcSet = (url, definitions = []) => {
  if (url?.indexOf('/adobe/dynamicmedia/deliver/dm-') >= 0) {
    const delimiter = url.indexOf('?') === -1 ? '?' : '&';

    return definitions
      .filter((definition) => definition.imageWidth)
      .map((definition) => {
        return `${url}${delimiter}width=${definition.imageWidth?.replace('px', '')} ${definition.imageWidth?.replace('px', 'w')}`;
      }).reverse();
  } else {
    return definitions
      .filter((definition) => definition.imageWidth)
      .map((definition) => {
        return `${url}/_jcr_content/renditions/${definition.renditionName} ${definition.imageWidth?.replace('px', 'w')}`;
      }).reverse();
  }
}

export default OptimizedImage;