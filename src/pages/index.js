import React from 'react';
import SeededShuffle from 'seededshuffle';

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

const now = new Date();
const startingSeed = btoa(
  `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`,
).slice(0, 10);

class LunchBot extends React.Component {
  state = {
    seed: this.props.location.search ? this.props.location.search.slice(1) : startingSeed,
    isMoreShown: false,
  };

  onNewSeed = () => {
    const seed = btoa(Math.random() * 999999).slice(0, 10);
    this.setState({ seed, isMoreShown: false });
  };

  onShowMore = () => {
    if (!this.state.isMoreShown) this.setState({ isMoreShown: true });
  };

  render() {
    console.log(this.props);
    const { location } = this.props;
    const { seed, isMoreShown } = this.state;

    // Get idempotent link
    const href = location.origin + location.pathname + '?' + seed;

    // Get shuffled list
    const selection = SeededShuffle.shuffle(LUNCH_SPOTS, seed, true);

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
          <button key={1} className="btn btn-outline-success" onClick={this.onNewSeed}>
            Give me new options&hellip;
          </button>
        ) : (
          <button key={2} className="btn btn-outline-secondary" onClick={this.onShowMore}>
            I&apos;m not feeling it&hellip;
          </button>
        )}
        <div className="idempotent">
          This link will give someone else the same options:
          <a href={href}>{href}</a>
        </div>
        <footer>
          A fun little thing by <a href="https://brandon.wang">Brandon Wang</a>.
        </footer>
      </div>
    );
  }
}
export default LunchBot;
