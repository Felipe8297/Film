import { Movie, useCart } from '@/contexts/Context'
import { formattedPrice } from '@/utils/formattedPrice'
import Image from 'next/image'
import { Button } from '../BuyButton'
import { Loader } from '../PageLoader'
import {  Container } from './styles'

interface CardProps {
  product: Movie
}

export const Card = ({ product }: CardProps) => {
  const { addMovieToCart, quantityMovieInStorage } = useCart()

  if (!product.id) {
    return <Loader />
  }

  const hasCurrentProduct = quantityMovieInStorage(product.id)

  const handleAddProduct = () => {
    const movieToAdd = { ...product, quantity: 1 }
    addMovieToCart(movieToAdd)
  }

  return (
    <Container>
      <div>
        <div>
          <Image
            src={product.image}
            loading="lazy"
            decoding="async"
            width={147}
            height={188}
          />

          <p>{product.title}</p>
        </div>

        <p>{formattedPrice.format(product.price)}</p>
      </div>

      <Button
        type="button"
        hasIcon
        onClick={handleAddProduct}
        disabled={hasCurrentProduct !== 0}
      >
        Adicionar ao carrinho
      </Button>
    </Container>
  )
}
