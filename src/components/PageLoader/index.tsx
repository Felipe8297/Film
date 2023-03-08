import Image from 'next/image'
import loaderImage from '@/assets/Loader.png'
import { LoaderContainer } from '@/components/PageLoader/Loader'

export const Loader = () => (
  <LoaderContainer>
    <Image
      src={loaderImage}
      loading="lazy"
      decoding="async"
    />
  </LoaderContainer>
)
