import React, { useState, useEffect } from 'react'
import SocketIO from '../utilities/SocketIO'

const Home = () => {
  // const [game, setGame] = useState(null)

  // const handleEmitMessage = (e) => {
  //   e.preventDefault();
  //   socket.emit('send-message',{usuario,message})
  // }

  const [player, setPlayer] = useState({})
  const [room, setRoom] = useState('')

  const handleChangePlayerData = (e) => {
    const { name, value } = e.target
    setPlayer(prev => ({ ...prev, [name]: value }))
  }

  const handleReceiveMessage = () => {
    SocketIO.on('create-room', (message) => {
      // console.log(message)
      setRoom(message)
    })

    SocketIO.on('game-error', (error) => {
      console.log('error => ', error)
    })
  }

  // const handleSetUsuario = (e) => {
  //   e.preventDefault()
  //   const {value} = e.target[0]
  //   setUsuario(value)
  //   // const {value} = e.target
  //   // setUsuario(value)
  // }

  // const handleSetMessage = (e) => {
  //   const {value} = e.target
  //   setMessage(value)
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
    SocketIO.emit('create-room', {
      name: 'Hector',
      color: '#B72000'
    })
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   const content = {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     mode: 'cors',
  //     method: 'POST',
  //     body: JSON.stringify({
  //       width: 5,
  //       height: 5,
  //       max_players: 4
  //     })
  //   }

  //   const url = 'http://127.0.0.1:4000/game'
  //   const response = await fetch(url,content)
  //   if(response.ok){
  //     const game = await response.json()
  //     setGame(game)
  //   }
  // }

  useEffect(() => {
    handleReceiveMessage()
  }, [])

  // useEffect(() => {
  //   console.log(game)
  // }, [game])

  useEffect(() => {
    console.log(player)
  }, [player])

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="row gx-1 gy-3">
          <div className="col-10">
            <input type="text" name="name" value={player?.name || ''} className="form-control" onChange={handleChangePlayerData} />
          </div>
          <div className="col-2">
            <input type="color" name="color" value={player?.color || ''} className="form-control form-control-color" onChange={handleChangePlayerData} />
          </div>
          <div className="col-12 text-center">
            <button className="btn btn-primary mx-1" type="button" onClick={() => SocketIO.emit('add-chip', 'probandox')} >Join Room</button>
            <button className="btn btn-primary mx-1">Create Room</button>
          </div>
          <div className="col-12">
            <h2>{room}</h2>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Home
