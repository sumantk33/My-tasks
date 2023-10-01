import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'
import styles from './loginwrapper.module.scss';
import Input from '../common/Input';
import Button from '../common/Button';
import { validateEmail } from '@/utils/helper';

export default function LoginWrapper() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth();
  const [error, setError] = useState({
    email: false,
    password: false
  })

  const handleSignIn = () => {
    login(email, password);
  }

  const updateEmail = val => {
    setEmail(val)
    let emailError = false;
    if (!validateEmail(val)) {
      emailError = true;
    }
    setError(prev => ({
      ...prev,
      email: emailError
    }))
  }

  const updatePassword = val => {
    setPassword(val);
  }

  const isCtaDisabled = error.email || error.password;

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContainer}>
        <div className={styles.title}>Sign In</div>
        <Input
          value={email}
          onChange={updateEmail}
          id="email"
          label="Email"
          className={styles.inputClass}
        />
        <Input
          value={password}
          onChange={updatePassword}
          id="password"
          label="Password"
          type="password"
          className={styles.inputClass}
        />
        <Button
          onClick={handleSignIn}
          className={styles.loginCta}
          disabled={isCtaDisabled}
        >
          Login
        </Button>
      </div>
    </div>
  )
}
