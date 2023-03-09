import { ListCards } from '@/components/ListCards'
import { Loader } from '@/components/PageLoader'
import { Movie } from '@/contexts/Context'
import { api } from '@/lib/axios'
import { revalidateTimer } from '@/utils/revalidateTimer'
import { GetStaticProps } from 'next'

interface HomeProps {
  products: Movie[]
}

export default function Home({ products }: HomeProps) {
  if (products.length === 0 || !products[0]?.id) {
    return <Loader />
  }

  return <ListCards products={products} />
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get<Movie[]>('/products')

  const movies = response.data.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      image: movie.image,
      price: movie.price,
    } as Movie
  })

  return {
    props: {
      products: movies,
    },
    revalidate: revalidateTimer(),
  }
}
