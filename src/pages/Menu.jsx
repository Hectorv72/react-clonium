import React, { useEffect } from 'react'
import SocketIO from '../utilities/SocketIO'
import { useNavigate } from 'react-router-dom'

const Menu = () => {
  const navigate = useNavigate()

  const handleEmitMessageCreateRoom = () => {
    SocketIO.emit('create-room', '')
  }

  const handleNavigateToRoom = (room) => {
    navigate(`/room/${room}`)
  }

  const handleReceiveMessage = () => {
    SocketIO.on('create-room', handleNavigateToRoom)
  }

  useEffect(() => {
    handleReceiveMessage()
  }, [])

  return (
    <div className="container my-5">
      <div className="row gy-3">
        <div className="col-12">
          <button type="button" className="btn btn-primary mx-1" onClick={handleEmitMessageCreateRoom}>Create Room</button>
          <button type="button" className="btn btn-primary mx-1">Join Room</button>
        </div>
        <div className="col-12">
          La lista
        </div>
        <div className="col-12">

        </div>
      </div>
    </div>
  )
}

export default Menu
