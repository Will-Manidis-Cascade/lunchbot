import React from 'react';
import _ from 'lodash';

import '../components/index/index.scss';

class LunchBot extends React.Component {
  state = {
    iteration: 0,
  };

  onGenerate = () => {
    this.setState(prevState => ({
      iteration: prevState.iteration + 1,
    }));
  };

  render() {
    const lunchSpots = [
      'sweetgreen (salads)',
      "Felipe's (burritos)",
      'Zambrero (burrito bowls)',
      'Shake Shack (burgers)',
      'Crema Cafe (sandwiches)',
      'b.good (burgers + salads)',
      'Pokeworks (poke)',
      'BONME (sandwiches)',
      "Darwin's Ltd (sandwiches)",
      'Flour Bakery (sandwiches)',
      "Pinnochio's (pizza)",
      'Clover (sandwiches)',
      'Tatte Bakery (sandwiches + salads)',
    ];

    const selected = _.sampleSize(lunchSpots, 3);

    return (
      <div className="LunchBot">
        <h1 className="pageTitle">I am the Lunchbot.</h1>
        <p>Reducing the number of choices, one meal at a time.</p>
        <hr />
        <h3>May I suggest &mdash;</h3>
        <ul className="placesList">
          {selected.map((spot, idx) => (
            <li key={idx} className={idx === 0 ? '-primary' : ''}>
              {spot}
            </li>
          ))}
        </ul>
        <button className="btn btn-outline-secondary" onClick={this.onGenerate}>
          Give me new options&hellip;
        </button>
      </div>
    );
  }
}
export default LunchBot;
