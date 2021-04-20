const createPlayer = ()=>{
  const body = {
    name: document.getElementById('name').value,
    lastName: document.getElementById('lastName').value,
    country: document.getElementById('country').value,
    ranking: document.getElementById('ranking').value,
    position: document.getElementById('position').value,
    brand: document.getElementById('brand').value
  }

  axios.post(`http://localhost:3000/players/new`, body)
  .then((result)=>{
    getAllPlayers()
  })
  .catch((err)=>{
    console.log(err)
  })
}

const editPlayer = ()=>{
    const _id = document.getElementById('_id').value

  const body = {
    name: document.getElementById('name-edit').value,
    lastName: document.getElementById('lastName-edit').value,
    country: document.getElementById('country-edit').value,
    ranking: document.getElementById('ranking-edit').value,
    position: document.getElementById('position-edit').value,
    brand: document.getElementById('brand-edit').value
  }

  const clean = (obj) =>{
    for (let propName in obj) {
      if (obj[propName] === "") {
        delete obj[propName];
      }
    }
    return obj
  }

  clean(body)

  axios.post(`http://localhost:3000/players/update/${_id}`, body)
  .then((result)=>{
    getAllPlayers()
  })
  .catch((err)=>{
    console.log(err)
  })
}

const getAllPlayers = ()=>{
  axios.get('http://localhost:3000/players')
  .then((result)=>{
    const playersDiv = document.getElementById('players')
    playersDiv.innerHTML = ''
    result.data.forEach((player)=>{
      const div = document.createElement('div')
      div.innerHTML = `
        <p>${player.name} ${player.lastName} ${player._id}</p>
        <button class="button" id=${player._id}>Delete</button>
      `
      playersDiv.appendChild(div)
    })
  
    const buttons = document.getElementsByClassName('button')
    const buttonsArray = [...buttons]
  
    buttonsArray.forEach((button)=>{
      button.addEventListener('click', ()=>{
        deletePlayer(button.id)
      })
    })
  })
  .catch((err)=>{
    console.log(err)
  })
}

const deletePlayer = (id)=>{
  axios({
    method: "POST",
    url: `http://localhost:3000/players/delete/${id}`
  })
  .then((result)=>{
    getAllPlayers()
  })
  .catch((err)=>{
    console.log(err)
  })
}

getAllPlayers()
 



