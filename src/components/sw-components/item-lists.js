import React from 'react'

import ItemList from '../item-list'
import { withData } from '../hoc-helper'
import SwapiService from '../../services/swapi-service'

const swapiService = new SwapiService()

const {
    getAllPeople,
    getAllPlanets,
    getAllStarships
} = swapiService

const withChldFunction = (Wrapped, renderName) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {renderName}
            </Wrapped>
        )
    }
}

const renderName = ({ name }) => <span>{name}</span>
const renderModelAndName = ({ model, name }) => <span>{name}  ({model})</span>

const PersonList = withData(
                        withChldFunction(ItemList, renderName), 
                        getAllPeople)

const PlanetList = withData(
                        withChldFunction(ItemList, renderName), 
                        getAllPlanets)

const StarshipList = withData(
                        withChldFunction(ItemList, renderModelAndName), 
                        getAllStarships)

export {
    PersonList,
    PlanetList,
    StarshipList
}