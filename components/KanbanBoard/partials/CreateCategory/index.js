import { useData } from '@/context/DataContext'
import { toastConfig, TOAST_TYPES } from '@/utils/helper'
import { IconButton } from '@chakra-ui/button'
import { Card, CardHeader } from '@chakra-ui/card'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { AddIcon } from '@chakra-ui/icons'
import { Input } from '@chakra-ui/input'
import { Flex, GridItem, Text } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'
import React, { useState } from 'react'

const CreateCategory = () => {
  const [isAddEnabled, setIsEnabled] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const { createCategory: createCategoryFn, getBoardData } = useData();
  const toast = useToast();

  const handleCategoryName = e => {
    setCategoryName(e.target.value);
  }

  const handleCategoryCreation = async () => {
    try {
      await createCategoryFn(categoryName);
      setIsEnabled(false);
      setCategoryName('');
      getBoardData();
    } catch(err) {
      toast(toastConfig(TOAST_TYPES.ERROR, 'Oops!', err.message))
    }
  }

  return (
    <GridItem>
      <Card w={250} size='sm' variant='elevated'>
        <CardHeader>
          {isAddEnabled ? (
            <Flex alignItems='flex-end' gap={1}>
              <Input variant='flushed' placeholder='Category name' size='sm' value={categoryName} onChange={handleCategoryName} />
              <IconButton
                variant='outline'
                aria-label='Add category'
                icon={<CheckIcon />}
                size='xs'
                onClick={handleCategoryCreation}
                isDisabled={!categoryName}
              />
              <IconButton
                variant='outline'
                colorScheme='red'
                aria-label='Close'
                onClick={() => setIsEnabled(false)}
                icon={<CloseIcon />}
                size='xs'
              />
            </Flex>
          ) : (
            <Flex gap={3} cursor="pointer" alignItems='center' justifyContent='center' onClick={() => setIsEnabled(true)}>
              <AddIcon />
              <Text fontSize='sm'>
                Add a category
              </Text>
            </Flex>
          )}
        </CardHeader>
      </Card>
    </GridItem>
  )
}

export default CreateCategory