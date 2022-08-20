import { Play } from 'phosphor-react'
import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import {  CountDownContainer,
          FormContainer,
          HomeContainer,
          MinutesAmountInput,
          Separator,
          StartCountDownButton,
          TaskInput } from './styles';
import { TypeOf } from 'zod';


/* interface NewCycleFormData{
  task: String;
  minutesAmount: Number;
} */

interface 

const Home = () => {

  const newCycleFormValidationSchema = zod.object({
    task:zod.string().min(1,'Informe a Tarefa'),
    MinutesAmount:zod.number().min(5).max(60)
  })

  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

  const { register, handleSubmit, watch,formState,reset } = useForm<NewCycleFormData>({
    resolver:zodResolver(newCycleFormValidationSchema),
    defaultValues:{
      task: '',
      MinutesAmount: 5
    }
  });

  function handleNewCycle(data:NewCycleFormData){
    console.log(data);
    reset();
  }

  console.log(formState.errors);

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
        <form onSubmit={handleSubmit(handleNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput type="text" id='task' 
           list='task-sugestions'
           placeholder='Dê um nome para seu projeto'
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
            min={5}
            //max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutos</span>
        </FormContainer>
        
        
     
        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountDownButton  type='submit' disabled={isSubmitDisabled}>
          <Play size={24}/>
          Começar</StartCountDownButton>
        </form>
    </HomeContainer>
     
  )
}

export default Home