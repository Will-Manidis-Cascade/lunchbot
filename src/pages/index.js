import React from 'react';
import ReactHelmet from 'react-helmet';
import SeededShuffle from 'seededshuffle';
import openGraphImage from '../components/OpenGraph.png';
import '../components/index/index.scss';

const BASE_URL = 'https://bw.github.io';

const LUNCH_SPOTS = [

  'Flour Bakery (sandwiches)',
  'Smoke Shop (BBQ)',
  'Lolita Cocina (Mexican)',
  "Kitchen Cafe (Breakfast + Brunch)",
  'Wheelhouse (Fast Lunch)',
  'bartaco Seaport (Mexican)',
  "Buco Trattoria (Italian)",
  'Tatte (Tatte)',
  'Bon Me',
  'Yoki Express (Sushi)',

  "Sweetgreen)",
  'Marco Polo (Deli)',
  "Aceituna",
  "Metro Cafe (Lunch)",

  'Shake Shack',
];


const now = new Date();
const startingSeed = Number(
  `${now.getFullYear()}${now.getMonth()}${now.getDate()}`,
).toString(36);

class LunchBot extends React.Component {
  state = {
    seed:
      this.props.location.search && this.props.location.search.startsWith('?tasty_')
        ? this.props.location.search.slice(7)
        : startingSeed,
    isMoreShown: false,
  };

  onNewSeed = () => {
    const seed = Date.now()
      .toString(36)
      .slice(0, 10);
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
    const href = location.origin + location.pathname + '?tasty_' + seed;

    // Get shuffled list
    const selection = SeededShuffle.shuffle(LUNCH_SPOTS, seed, true);

    // Generate title/meta
    const title = 'The Fort Point Lunchbot';
    const description = `Making tasty decisions. A Cascade.Bio project, forked from Brandon Wang.`;

    return (
      <div className="LunchBot">
        <ReactHelmet>
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@willmanidis" />
          <meta name="twitter:creator" content="@willmanidis" />
          <meta property="og:site_name" content="The Lunchbot" />

          <title>{title}</title>
          <meta property="og:title" content={title} />
          <meta property="twitter:title" content={title} />

          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />

          <meta property="og:image" content={BASE_URL + openGraphImage} />
          <meta name="twitter:image" content={BASE_URL + openGraphImage} />
        </ReactHelmet>
        <h1 className="pageTitle">I am the Lunchbot.</h1>
        <p>
          <span>Reducing the number of choices,</span> <span>one meal at a time.</span>
        </p>
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
        {startingSeed !== seed && (
          <div className="idempotent">
            This link gives others your new options:
            <a href={href}>{href}</a>
          </div>
        )}

        <footer>
          {startingSeed === seed && (
            <>
              The Lunchbot makes a new fast-casual Fort POint suggestion every day or
              on demand.
              <br />
            </>
          )}
          A fun little thing by <a href="https://brandon.wang">Brandon Wang</a>. Rebuilt by  <a href="https://WillManidis.com">Will Manidis</a> 
        </footer>
      </div>
    );
  }
}
export default LunchBot;
