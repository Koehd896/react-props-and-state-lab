import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleChange = (event) => {
    this.setState({
      ...this.state.filters,
      type: event.target.value
    })
  }

  handleFetch = () => {
    let queryParam
    if (this.state.filters.type === "all") {
      queryParam = ""
    } else {
      queryParam = `/?${this.state.filters.type}`
    }
    fetch(`api/pets${queryParam}`)
      .then(response => response.json())
      .then(pet => this.state.pets << pet)
  }

  handleAdopt = (id) => {

    const adoptedPet = this.state.pets.find(pet => pet.id === id);
    const petId = adoptedPet.id;
    this.setState({
      ...this.state,
      
    })
    //  adoptedPet.isAdopted = true; \
    //  const updatedPets = this.state.pets
    // this.setState({
    //   ...this.state,
    //   pets: updatedPets
    // })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
                onChangeType={(event) => this.handleChange(event)}
                onFindPetsClick={() => this.handleFetch()}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser 
                onAdoptPet={this.handleAdopt(id)}
                pets={this.state.pets}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
