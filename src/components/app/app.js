import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import ErrorBoundry from "../error-boundry";
import SwapiService from '../../services/swapi-service'
import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList
} from '../sw-components'

import './app.css';

export default class App extends Component {

  swapiService = new SwapiService()

  state = {
    showRandomPlanet: true
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  render() {

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet/> :
      null;

    return (
      <ErrorBoundry>
        <div className="stardb-app">
          <Header />
          {/* { planet }

          <div className="row mb2 button-row">
            <button
              className="toggle-planet btn btn-warning btn-lg"
              onClick={this.toggleRandomPlanet}>
              Toggle Random Planet
            </button>
            <ErrorButton />
          </div>
 */}
          <PersonList />
          <PlanetList />
          <StarshipList />
        </div>
      </ErrorBoundry>
    );
  }
}
