import { formattedPrice } from '@/utils/formattedPrice'
import Link from 'next/link'
import { Button } from '../BuyButton'
import { FooterContainer } from './styles'

interface FooterProps {
  buttonText: string
  total: number
}

export const Footer = ({ buttonText, total }: FooterProps) => (
  <FooterContainer>
    <Link href="/cart-confirmation" prefetch={false}>
      <Button>{buttonText}</Button>
    </Link>

    <section>
      <p>Total</p>
      <span>{formattedPrice.format(total)}</span>
    </section>
  </FooterContainer>
)
// para navegação entre paginas poderia ser utilizado o RouterDOM como outra opção 