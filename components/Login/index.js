import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'
import styles from './loginwrapper.module.scss';
import { BUTTON_TYPES, toastConfig, TOAST_TYPES, validateEmail } from '@/utils/helper';
import { Button } from '@chakra-ui/button';
import { Text } from '@chakra-ui/layout';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { useToast } from '@chakra-ui/toast';
import { useRouter } from 'next/router';

export default function LoginWrapper() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState({
    email: false,
    password: false
  })

  const { login, user } = useAuth();
  const toast = useToast();
  const router = useRouter();

  const handleClick = () => setShow(!show)

  const handleSignIn = async () => {
    try {
      await login(email, password);
      toast(toastConfig(TOAST_TYPES.SUCCESS, 'Signed In!', "You can now use My-Tasks."))
      router.push('/');
    } catch (err) {
      toast(toastConfig(TOAST_TYPES.ERROR, 'Oops!', err.message))
    }
  }

  const updateEmail = e => {
    const val = e.target.value
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

  const updatePassword = e => {
    const val = e.target.value
    setPassword(val);
  }

  const isCtaDisabled = error.email || error.password;

  if (user) {
    router.push('/');
  }

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContainer}>
        <div className={styles.title}>Sign In</div>
        <Text mt={8} mb={2}>Email:</Text>
        <Input
          value={email}
          onChange={updateEmail}
          placeholder='Enter email'
        />
        <Text mt={4} mb={2}>Password:</Text>
        <InputGroup size='md' mb={2}>
          <Input
            pr='4.5rem'
            type={show ? 'text' : 'password'}
            placeholder='Enter password'
            value={password}
            onChange={updatePassword}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button
          colorScheme='gray'
          variant={BUTTON_TYPES.OUTLINE}
          mt={8}
          disabled={isCtaDisabled}
          onClick={handleSignIn}
        >
          Login
        </Button>
      </div>
    </div>
  )
}
