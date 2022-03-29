// import logo from './logo.svg';
import {useState, useEffect} from 'react'
import './App.css';
import socket from './utilities/SocketIO'

function App() {
  const [list,setList] = useState([])
  const [usuario, setUsuario] = useState(null)
  const [message, setMessage] = useState('')

  const handleEmitMessage = (e) => {
    e.preventDefault();
    socket.emit('send-message',{usuario,message})
  }

  const handleEmitClearMessages = () => {
    socket.emit('clear-messages')
  }

  const handleReceiveMessage = () => {
    socket.on('send-message',(message)=>{
      setList(list => [...list,message])
    })
    socket.on('clear-messages',()=>{
      setList([])
    })
  }

  const handleSetUsuario = (e) => {
    e.preventDefault()
    const {value} = e.target[0]
    setUsuario(value)
    // const {value} = e.target
    // setUsuario(value)
  }

  const handleSetMessage = (e) => {
    const {value} = e.target
    setMessage(value)
  }

  useEffect(() => {
    handleReceiveMessage()
  }, []);

  return (
    <div>
      <div style={{overflow:'hidden',overflowY:'scroll',height:'400px'}}>
        {
          [...list].map(
            ({usuario,message}) => 
              <p>{usuario+': '+message}</p>
          )
        }
      </div>
      {
        usuario
          ? 
            <form onSubmit={handleEmitMessage}>
              <input type="text" value={message} onChange={handleSetMessage} />
              <button type="submit">Enviar</button>
              <button type="button" onClick={handleEmitClearMessages}>Borrar</button>
            </form>
          :
            <form onSubmit={handleSetUsuario}>
              <input type="text" />
              <button type="submit">Setear</button>
            </form>
      }
    </div>
  );
}

export default App;
