import { formatDistanceToNow } from 'date-fns/esm'
import { ptBR } from 'date-fns/locale'
import React from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { HistoryContainer, HistoryList, Status } from './styles'


const History = () => {

  const { cycles } = React.useContext(CyclesContext)

  return (

    
    <HistoryContainer>


      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            
           
            {cycles.map(cycle => {
              return(
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>{formatDistanceToNow(cycle.startDate, {
                  addSuffix: true,
                  locale:ptBR
                }) }</td>
                <td>
                  {cycle.finishDate && <Status statusColor='green'>Concluido</Status>}
                  {cycle.interruptedDate && <Status statusColor='red'>Interrompido</Status>}
                  {!cycle.finishDate && !cycle.interruptedDate && <Status statusColor='yellow'>Em Andamento</Status>}
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>

  )
}
export default History;