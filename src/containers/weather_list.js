import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chartitem from "../components/chart-item";
import GoogleMap from "../components/googlemap";

class WeatherList extends Component
{
  renderList(CityData)
  {
    const temps = _.map(CityData.list.map(weather => weather.main.temp), (ktoc) => { return ktoc-273.15 });
    const pressures = CityData.list.map(weather => weather.main.pressure);
    const humidity = CityData.list.map(weather => weather.main.humidity);
    const { lon, lat } = CityData.city.coord;

    return(
      <tr key= { CityData.city.id }>
        {/* <td>{ CityData.city.name }</td> */}
        <td> <GoogleMap lon={lon} lat={lat} /> </td>
        <td>
          <Chartitem data={ temps } color="red" units="C" />
        </td>
        <td>
          <Chartitem data={ pressures } color="orange" units="hPa"/>
        </td>
        <td>
          <Chartitem data={ humidity } color="blue" units="%"/>
        </td>
      </tr>)
  }

  render()
  {
    return(
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature</th>
            <th>Pressure</th>
            <th>Humidity</th>
          </tr>
        </thead>
        <tbody>
          { this.props.weather.map(this.renderList) }
        </tbody>
      </table>)
  }
}

function mapStateToProps({ weather })
{
  return { weather };
}

export default connect(mapStateToProps)(WeatherList);