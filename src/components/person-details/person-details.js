import React, { Component } from "react";

import "./person-details.css";
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import ErrorButton from '../error-button';

export default class PersonDetails extends Component {
  swapiService = new SwapiService();

  state = {
    loading: true,
    person: null
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.setState({ loading: true });
      this.updatePerson();
    }
  }

  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return;
    }
    this.swapiService.getPerson(personId).then(this.onPersonLoaded);
  }

  onPersonLoaded = personId => {
    this.setState({
      person: personId,
      loading: false
    });
  };

  render() {
    const { loading, person } = this.state;

    if (!person) {
      return <span>Select a person from list.</span>;
    }

    const hasData = !loading;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PersonView person={person} /> : null;

    return (
      <div className="person-details card">
        {spinner}
        {content}
      </div>
    );
  }
}

const PersonView = ( { person } ) => {
  const { id, name, gender, birth_year, eye_color } = person;

  return (
    <React.Fragment>
      <img
        className="person-image"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
      />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birth_year}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eye_color}</span>
          </li>
        </ul>
        <ErrorButton />
      </div>
    </React.Fragment>
  );
};
