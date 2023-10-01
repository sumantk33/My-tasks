import Head from 'next/head'
import React from 'react'

const Meta = () => {
  return (
    <>
      <Head>
        <title>My-Tasks</title>
        <meta name="description" content="App to create and manage tasks" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

export default Meta