import trash from '@/assets/trash.svg'
import Image from 'next/image'
import { ButtonHTMLAttributes } from 'react'
import { TrashButtonContainer } from './styles'

export const TrashButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <TrashButtonContainer {...props}>
    <Image
      src={trash}
      loading="lazy"
      decoding="async"
      width={18}
      height={18}
    />
  </TrashButtonContainer>
)
