import React from 'react';
import _ from 'lodash';

import '../components/index/index.scss';

const LUNCH_SPOTS = [
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

class LunchBot extends React.Component {
  state = {
    isMoreShown: false,
    selection: [],
  };

  componentDidMount() {
    this.onNewBatch();
  }

  onNewBatch = () => {
    this.setState({ isMoreShown: false, selection: _.sampleSize(LUNCH_SPOTS, 3) });
  };

  onShowMore = () => {
    if (!this.state.isMoreShown) this.setState({ isMoreShown: true });
  };

  render() {
    const { selection, isMoreShown } = this.state;

    return (
      <div className="LunchBot">
        <h1 className="pageTitle">I am the Lunchbot.</h1>
        <p>Reducing the number of choices, one meal at a time.</p>
        <hr />
        <h3>May I humbly suggest &mdash;</h3>
        <ul className="placesList">
          {selection.slice(0, isMoreShown ? 3 : 1).map((spot, idx) => (
            <li key={idx}>{spot}</li>
          ))}
        </ul>
        {isMoreShown ? (
          <button key={1} className="btn btn-outline-success" onClick={this.onNewBatch}>
            Give me new options&hellip;
          </button>
        ) : (
          <button key={2} className="btn btn-outline-secondary" onClick={this.onShowMore}>
            I&apos;m not feeling it&hellip;
          </button>
        )}
        <hr />
        <footer>
          A fun little thing by <a href="https://brandon.wang">Brandon Wang</a>.
        </footer>
      </div>
    );
  }
}
export default LunchBot;
