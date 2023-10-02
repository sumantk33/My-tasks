import { useData } from '@/context/DataContext'
import { DB_COLUMNS, toastConfig, TOAST_TYPES } from '@/utils/helper';
import { Card, CardBody, CardHeader } from '@chakra-ui/card'
import { Flex, GridItem, Heading, Spacer, Stack, StackDivider, Text } from '@chakra-ui/layout'
import { Checkbox } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/toast';
import { useDisclosure } from '@chakra-ui/hooks';
import { Collapse } from '@chakra-ui/transition';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import React from 'react'
import If from '@/components/common/If';
import CreateTask from '../CreateTask';
import Settings from '../Settings';

const Category = ({ category }) => {
  const { updateTask, getBoardData } = useData();
  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure()

  const handleCheckBox = async (e, taskId) => {
    const newValue = e.target.checked;
    try {
      await updateTask(DB_COLUMNS.IS_COMPLETED, newValue, taskId);
      getBoardData()
    } catch(err) {
      toast(toastConfig(TOAST_TYPES.ERROR, 'Oops!', err.message))
    }
  }

  return (
    <GridItem>
      <Card w={250} size='sm' variant='elevated'>
          <CardHeader>
            <Flex>
              <Heading size='sm'>{category.title}</Heading>
              <Text ml={2}>({category?.totalTasksCount - category?.completedTasksCount})</Text>
            </Flex>
          </CardHeader>

        <CardBody>
          <CreateTask category={category} />
          <Stack divider={<StackDivider />} spacing='2'>
            {category?.tasks?.map(task => (
              <Flex gap={3} key={task.id}>
                <Checkbox isChecked={task?.is_completed} onChange={(e) => handleCheckBox(e, task.id)} />
                <Text fontSize='sm'>
                  {task?.name}
                </Text>
                <Spacer />
                <Settings category={category} id={task.id} />
              </Flex>
            ))}
          </Stack>

          <If test={category?.completedTasksCount}>
            <Flex mt={4} alignItems='center' onClick={onToggle} cursor="pointer">
              <Text fontSize='sm'>
                Completed ({category?.completedTasksCount})
              </Text>
              <Spacer />
              {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Flex>
            <Stack divider={<StackDivider />} spacing='2' mt={2}>
              <Collapse in={isOpen} animateOpacity>
                {category?.completedTasks?.map(task => (
                  <Flex gap={3} key={task.id}>
                    <Checkbox isChecked={task?.is_completed} onChange={(e) => handleCheckBox(e, task.id)} />
                    <Text fontSize='sm' as={task?.is_completed && 'del'} opacity={task?.is_completed && '0.5'}>
                      {task?.name}
                    </Text>
                    <Spacer />
                    <Settings category={category} id={task.id} completed />
                  </Flex>
                ))}
              </Collapse>
            </Stack>
          </If>
        </CardBody>
      </Card>
    </GridItem>
  )
}

export default Category