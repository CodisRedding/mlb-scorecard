import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import gameData from './game.json'
import playsData from './plays.json'
import boxscore from './boxscore';

function GameDetails(props) {
  const getInfo = (key) => {
    const item = props.boxscore.info.filter((info) => {
      return info.label === key;
    });
    return item.length === 1 ? item[0].value : '';
  }

  return (
    <table className="details">
      <tbody>
        <tr>
          <td>Team:</td><td className="value">{props.boxscore.teams.home.team.name}</td>
          <td>VS</td><td className="value">{props.boxscore.teams.away.team.name}</td>
          <td>at</td><td className="value">{getInfo('Venue')}</td>
          <td colSpan="2"></td>
        </tr>
        <tr>
          <td>Date:</td><td className="value">{props.data.dates[0].date}</td>
          <td>Start Time</td><td className="value">{getInfo('First pitch')}</td>
          <td>End Time</td><td className="value"></td>
          <td>Time of Game</td><td className="value">{getInfo('T')}</td>
        </tr>
        <tr>
          <td>Weather:</td><td className="value">
            {getInfo('Weather')}&nbsp;
            {getInfo('Wind')}
          </td>
          <td colSpan="6"></td>
        </tr>
        <tr>
          <td>Umpires:</td><td className="value">{getInfo('Umpires')}</td>
          <td colSpan="2"></td>
          <td>Scorer:</td><td className="value"></td>
          <td colSpan="2"></td>
        </tr>
        <tr>
          <td colSpan="4"></td>
          <td>Attendance:</td><td className="value">{getInfo('Att')}</td>
          <td colSpan="2"></td>
        </tr>
      </tbody>
    </table>
  );
}

function Batter(props) {
  return (
    <tr>
      <td>{props.number}</td>
      <td>{props.name}</td>
      <td>{props.position}</td>
    </tr>
  );
}

function BatterInfo(props) {
  const batters = [];

  props.batters.forEach((batter) => {
    console.log({batter})
    batters.push(
      <Batter
        key={batter.number}
        number={batter.number}
        name={batter.name}
        position={batter.position}
      />
    );
  });
  
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Player</th>
          <th>Pos</th>
        </tr>
      </thead>
      <tbody>{batters}</tbody>
    </table>
  );
}

function BatterInnings(props) {

}

function BatterStats(props) {
  const homeOrAway = props.isHomeTeam ? 'home' : 'away';
  const topOrBottom = props.isHomeTeam ? 'bottom' : 'top';
  const team = props.boxscore.teams[homeOrAway];

  const plays = props.playsData.allPlays.filter((play) => {
    return play.about.halfInning === topOrBottom;
  });

  const batters = team.batters.map((playerId) => {
    const player = team.players[`ID${playerId}`];
    return {
      name: player.person.fullName,
      number: player.jerseyNumber,
      position: player.position.code === '10' ? 'DH' : player.position.code
    };
  });

  return (
    <div className="batter-stats">
      <div className="batter-info">
        <BatterInfo batters={batters}/>
      </div>
      <div className="innings">

      </div>
      <div className="totals">

      </div>
    </div>
  );
}

class ScoreCard extends React.Component {
  isHomeTeam = this.props.boxscore.teams.home.team.id === this.props.teamId;

  render() {
    return (
      <div className="score-card">
        <div className="game-details">
          <GameDetails data={this.props.gameData} boxscore={this.props.boxscore} />
        </div>
        <div className="batter-stats">
          <BatterStats isHomeTeam={this.isHomeTeam} playsData={this.props.playsData} boxscore={this.props.boxscore} />
        </div>
        <div className="batter-stats-totals">

        </div>
        <div className="pitcher-stats">

        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ScoreCard teamId={114} gameData={gameData} playsData={playsData} boxscore={boxscore} />,
  document.getElementById('root')
);

/*
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares,
      xIsNext: !this.state.xIsNext
    });
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    )
  }

  render() {
    const status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{}</div>
          <ol>{}</ol>
        </div>
      </div>
    );
  }
}
*/


/*

ALL PLAYS ARRAY
allplays: []
*/