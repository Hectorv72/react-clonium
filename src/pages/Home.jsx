import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useSocket from '../hooks/useSocket'

const Home = () => {
  const navigate = useNavigate()
  const [socket, error] = useSocket()
  const [player, setPlayer] = useState({})

  const handleEmitMessage = (e) => {
    e.preventDefault()
    socket.emit('create-player', { ...player })
  }

  const handleChangePlayerData = (e) => {
    const { name, value } = e.target
    setPlayer(prev => ({ ...prev, [name]: value }))
  }

  const handleReceiveMessage = () => {
    socket.on('create-player', (message) => {
      console.log(message)
      navigate('/menu')
    })
  }

  useEffect(handleReceiveMessage, [])

  useEffect(() => {
    console.log(player)
  }, [player])

  useEffect(() => {
    console.log(error)
  }, [error])

  return (
    <div className="container my-5">
      <form onSubmit={handleEmitMessage}>
        <div className="row gx-1 gy-3">
          <div className="col-10">
            <input type="text" name="name" value={player?.name || ''} className="form-control" onChange={handleChangePlayerData} required />
          </div>
          <div className="col-12 text-center">
            <button className="btn btn-primary mx-1">Start</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Home
