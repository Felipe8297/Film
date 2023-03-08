import minus from '@/assets/minus.svg'
import plus from '@/assets/plus.svg'
import Image from 'next/image'
import { SectionQuantity } from '../styles'

interface QuantityProps {
  quantity: number
  onDecrease: () => void
  onIncrease: () => void
}

export const Quantity = ({
  quantity,
  onDecrease,
  onIncrease,
}: QuantityProps) => (
  <SectionQuantity>
    <button type="button" onClick={onDecrease}>
      <Image
        src={minus}
        loading="lazy"
        decoding="async"
        width={18}
        height={18}
      />
    </button>

    <span>{quantity}</span>

    <button type="button" onClick={onIncrease}>
      <Image
        src={plus}
        loading="lazy"
        decoding="async"
        width={18}
        height={18}
      />
    </button>
  </SectionQuantity>
)
