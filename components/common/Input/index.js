import { inter } from '@/layouts/PrimaryLayout';
import { mergeClassNames } from '@/utils/helper';
import React from 'react'
import If from '../If';
import styles from './input.module.scss';

const Input = ({
  label = null, id = '', type = 'text', value, onChange, className = null,
}) => {
  return (
    <div className={mergeClassNames([styles.inputWrapper, inter.className], { [className]: className })}>
      <If test={label}>
        <label for={id} className={styles.label}>{label}</label>
      </If>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} className={styles.input} />
    </div>
  )
}

export default Input