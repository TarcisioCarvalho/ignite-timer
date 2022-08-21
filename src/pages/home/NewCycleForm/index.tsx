import React from 'react'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

const NewCycleForm = () => {

    const newCycleFormValidationSchema = zod.object({
        task: zod.string().min(1, 'Informe a Tarefa'),
        MinutesAmount: zod.number().min(1).max(60),
      })

    type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

    const { register, handleSubmit, watch, formState , reset } = useForm<NewCycleFormData>({
        resolver:zodResolver(newCycleFormValidationSchema),
      defaultValues: {
        task: '',
        MinutesAmount: 0,
        }
      });
    

  return (
    <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput type="text" id='task' 
           list='task-sugestions'
           placeholder='Dê um nome para seu projeto'
           disabled={!!activeCycle}
           {...register('task')}
           />
          <datalist id='task-sugestions'>
            <option value="Projeto 1"/>
            <option value="Projeto 2"/>
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
           type="number"
           id='minutesAmount'
           placeholder='00'
            step={5}
            min={1}
            max={60}
            disabled={!!activeCycle}
            {...register('MinutesAmount', { valueAsNumber: true })}
          />
          <span>minutos</span>
        </FormContainer>
  )
}

export default NewCycleForm