import Image from 'next/image'
import React from 'react'
import { STATICS, ICON_MEDIA } from './enums'

const Icon = ({ name, alt = "image", size = 2, className = '' }) => {
  return (
    <Image
      src={ICON_MEDIA[name]}
      width={size * STATICS.SIZE_MULTIPLIER}
      height={size * STATICS.SIZE_MULTIPLIER}
      alt={alt}
      className={className}
    />
  )
}

export default Icon