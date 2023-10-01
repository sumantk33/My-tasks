import { mergeClassNames } from '@/utils/helper';
import React from 'react'
import styles from './button.module.scss';

export const BTN_VARIANTS = {
  PRIMARY: 'PRIMARY',
  OUTLINE: 'OUTLINE'
}

const getVariantClass = (variant) => {
  switch(variant) {
    case BTN_VARIANTS.OUTLINE:
      return styles.outlineBtn
    case BTN_VARIANTS.PRIMARY:
    default:
      return styles.primaryBtn;
  }
}

const Button = ({ onClick, children, variant = BTN_VARIANTS.OUTLINE }) => {
  return (
    <button className={mergeClassNames([styles.button, getVariantClass(variant)])} onClick={onClick}>{children}</button>
  )
}

export default Button