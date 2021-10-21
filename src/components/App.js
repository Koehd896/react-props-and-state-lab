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
      filters:
      {...this.state.filters, type: event.target.value}
    })
  }

  handleFetch = () => {
    let queryParam;
    if (this.state.filters.type === "all") {
      queryParam = ""
    } else {
      queryParam = `?type=${this.state.filters.type}`
    }
    fetch(`/api/pets${queryParam}`)
      .then(response => response.json())
      .then(pets => this.setState({
        pets: pets
      }))
  }

  handleAdopt = (id) => {
    const pets = this.state.pets.map(p => {
     return p.id === id ? {...p, isAdopted: true} : p;
    })
    this.setState({pets: pets});
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
                onChangeType={this.handleChange}
                onFindPetsClick={this.handleFetch}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser 
                onAdoptPet={this.handleAdopt}
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
