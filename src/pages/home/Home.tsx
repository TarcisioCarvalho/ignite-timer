import { Play } from 'phosphor-react'
import React from 'react'
import {  CountDownContainer,
          FormContainer,
          HomeContainer,
          MinutesAmountInput,
          Separator,
          StartCountDownButton,
          TaskInput } from './styles';

const Home = () => {
  return (
    <HomeContainer>
        <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput type="text" id='task' list='task-sugestions' placeholder='Dê um nome para seu projeto'/>
          <datalist id='task-sugestions'>
            <option value="Projeto 1"/>
            <option value="Projeto 2"/>
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput type="number"  id='minutesAmount' placeholder='00'
            step={5}
            min={5}
            max={60}
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

        <StartCountDownButton disabled type='submit'>
          <Play size={24}/>
          Começar</StartCountDownButton>
        </form>
    </HomeContainer>
     
  )
}

export default Home