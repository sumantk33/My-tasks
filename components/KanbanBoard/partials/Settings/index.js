import { useData } from '@/context/DataContext'
import { toastConfig, TOAST_TYPES } from '@/utils/helper'
import { Button, IconButton } from '@chakra-ui/button'
import { DeleteIcon } from '@chakra-ui/icons'
import { Stack, StackDivider } from '@chakra-ui/layout'
import { Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/popover'
import { useToast } from '@chakra-ui/toast'
import React from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'

const Settings = ({ category, completed = false, id }) => {
  const { deleteTask, getBoardData } = useData();
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await deleteTask(category, id)
      getBoardData();
    } catch(err) {
      toast(toastConfig(TOAST_TYPES.ERROR, 'Oops!', err.message))
    }
  }

  if (completed) {
    return (
      <IconButton
        aria-label='Delete task'
        size="xs"
        ml={2}
        variant='unstyled'
        onClick={handleDelete}
        icon={<DeleteIcon/>}
      />
    )
  }
  return (
    <Popover
      placement='right'
      isLazy
    >
      <PopoverTrigger>
        <IconButton
          aria-label='Delete task'
          size="xs"
          ml={2}
          variant='unstyled'
          icon={<PiDotsThreeVerticalBold/>}
        />
      </PopoverTrigger>
      <PopoverContent w='100px'>
        <PopoverArrow />
        <PopoverBody py={1}>
        <Stack divider={<StackDivider />} spacing='2'>
          <Button leftIcon={<MdEdit />} colorScheme='teal' variant='unstyled' size='xs' isDisabled>
            Edit
          </Button>
          <Button leftIcon={<MdDelete />} colorScheme='teal' variant='unstyled' size='xs' onClick={handleDelete}>
            Delete
          </Button>
        </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default Settings