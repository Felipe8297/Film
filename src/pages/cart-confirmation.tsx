import confirmImg from '@/assets/confirm.svg'
import { Button } from '@/components/BuyButton'
import Image from 'next/image'
import { ConfirmCartContainer } from '@/styles/pages/confirmCart'
import { useCart } from '@/contexts/Context'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { revalidateTimer } from '@/utils/revalidateTimer'
import { useEffect } from 'react'
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

  const { alt, height, src, title, width } = options[0]

  useEffect(() => {
    if (cartQuantity > 0) {
      cleanCart()
    }
  }, [cartQuantity, cleanCart])

  if (cartQuantity > 0) {
    return <Loader />
  }

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
      title: 'Compra realizada com sucesso!',
      src: confirmImg,
      alt: 'Man with black hair, light shirt, dark pants, has the thumb of his left hand raised, behind a circle with a blue background with a confirmation symbol above his thumb. On the left side at the front is a completed form. Illustration.',
      width: 295,
      height: 307,
    },
  ]

  return {
    props: {
      options,
    },
    revalidate: revalidateTimer(),
  }
}
