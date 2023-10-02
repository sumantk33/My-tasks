import { Flex, Text } from '@chakra-ui/layout'
import { AddIcon, CheckIcon } from '@chakra-ui/icons';
import React, { useState } from 'react'
import { useDisclosure } from '@chakra-ui/hooks';
import { Collapse } from '@chakra-ui/transition';
import { Input } from '@chakra-ui/input';
import { IconButton } from '@chakra-ui/button';
import { useData } from '@/context/DataContext';
import { useToast } from '@chakra-ui/toast';
import { toastConfig, TOAST_TYPES } from '@/utils/helper';

const CreateTask = ({ category }) => {
  const { isOpen, onToggle } = useDisclosure()
  const [title, setTitle] = useState('');
  const { createTask, getBoardData } = useData();
  const toast = useToast();

  const handleTitleChange = e => {
    setTitle(e.target.value)
  }

  const handleTaskAddition = async () => {
    try {
      await createTask(category, title);
      getBoardData();
      setTitle('')
      onToggle();
    } catch(err) {
      toast(toastConfig(TOAST_TYPES.ERROR, 'Oops!', err.message))
    }
  }

  return (
    <>
      <Flex gap={3} cursor="pointer" alignItems='center' mb={2} onClick={onToggle}>
        <AddIcon />
        <Text fontSize='sm'>
          Add a task
        </Text>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Flex alignItems='center' mb={4}>
          <Input placeholder='Enter the task title' value={title} onChange={handleTitleChange} size="sm" variant="filled"/>
          <IconButton
            colorScheme='blue'
            aria-label='Add task'
            size="xs"
            ml={2}
            onClick={handleTaskAddition}
            isDisabled={!title}
            icon={<CheckIcon />}
          />
        </Flex>
      </Collapse>
    </>
  )
}

export default CreateTask