import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SocketIO from '../utilities/SocketIO'

const Home = () => {
  const navigate = useNavigate()
  const [player, setPlayer] = useState({})
  const [message, setMessage] = useState('')

  const handleEmitMessage = (e) => {
    e.preventDefault()
    SocketIO.emit('create-player', { ...player })
  }

  const handleChangePlayerData = (e) => {
    const { name, value } = e.target
    setPlayer(prev => ({ ...prev, [name]: value }))
  }

  const handleReceiveMessage = () => {
    SocketIO.on('create-player', (message) => {
      navigate('/menu')
    })

    SocketIO.on('game-error', (error) => {
      setMessage(error.message)
    })
  }

  useEffect(() => {
    handleReceiveMessage()
  }, [])

  useEffect(() => {
    console.log(player)
  }, [player])

  return (
    <div className="container my-5">
      <form onSubmit={handleEmitMessage}>
        <div className="row gx-1 gy-3">
          <div className="col-10">
            <input type="text" name="name" value={player?.name || ''} className="form-control" onChange={handleChangePlayerData} />
          </div>
          <div className="col-12 text-center">
            <button className="btn btn-primary mx-1">Start</button>
          </div>
          <div className="col-12">
            <h2>{message}</h2>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Home
