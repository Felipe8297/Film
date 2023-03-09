import emptyImg from '@/assets/empty.svg'
import { Button } from '@/components/BuyButton'
import Image from 'next/image'
import { ConfirmCartContainer } from '@/styles/pages/confirmCart'
import { useCart } from '@/contexts/Context'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { revalidateTimer } from '@/utils/revalidateTimer'
import { Loader } from '@/components/PageLoader'

interface Option {
  title: string
  src: string
  alt: string
  width: number
  height: number
}

interface ConfirmCartProps {
  options: Option[]
}

export default function ConfirmCart({ options }: ConfirmCartProps) {
  const { cartQuantity, cleanCart } = useCart()

  if (cartQuantity > 0) {
    cleanCart()

    return <Loader />
  }

  const {height, src, title, width } = options[0]

  return (
    <ConfirmCartContainer content={cartQuantity ? 'confirm' : 'empty'}>
      <h1>{title}</h1>

      <Image
        src={src}
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
      />

      <Link href="/" prefetch={false}>
        <Button>Voltar</Button>
      </Link>
    </ConfirmCartContainer>
  )
}

export const getStaticProps: GetStaticProps = () => {
  const options = [
    {
      title: 'Parece que não há nada por aqui :(',
      src: emptyImg,
      alt: 'Standing woman with black hair, black clothing and light overcoat, holding a circle with a blue background containing a circle of 2 clockwise arrows. Illustration.',
      width: 447,
      height: 266,
    },
  ]

  return {
    props: {
      options,
    },
    revalidate: revalidateTimer(),
  }
}
