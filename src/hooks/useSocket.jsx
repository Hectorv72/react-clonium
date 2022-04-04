import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import { errorActions } from '../utilities/list_actions'

const useSocket = (url = null) => {
  const server = url || 'http://127.0.0.1:4000'
  const io = socketIOClient(server)
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const errorGameEvents = (error) => {
    const { type, action } = error
    setError(error)

    // console.log('type =>', type)
    // console.log('action =>', action)
    // console.log('message =>', message)
    const { data_undefined: dataUndefined } = errorActions

    if (type === 'player' && action === dataUndefined) {
      navigate('/')
    }
  }

  const listenMessages = () => {
    io.on('error-game', errorGameEvents)
  }

  // useEffect(emitMessages, [])
  useEffect(listenMessages, [])

  return [io, error]
}

export default useSocket
