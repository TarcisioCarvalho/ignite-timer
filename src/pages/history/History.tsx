import React from 'react'
import { HistoryContainer, HistoryList, Status } from './styles'

const History = () => {
  return (
    <HistoryContainer>

      

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th><Status statusColor='red'>Concluido</Status></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tarefa</td>
              <td>Duração</td>
              <td>Início</td>
              <td><Status statusColor='green'>Concluido</Status></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>Duração</td>
              <td>Início</td>
              <td><Status statusColor='green'>Concluido</Status></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>Duração</td>
              <td>Início</td>
              <td><Status statusColor='green'>Concluido</Status></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>Duração</td>
              <td>Início</td>
              <td><Status statusColor='green'>Concluido</Status></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>Duração</td>
              <td>Início</td>
              <td><Status statusColor='green'>Concluido</Status></td>
            </tr>
           
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>

  )
}
export default History;