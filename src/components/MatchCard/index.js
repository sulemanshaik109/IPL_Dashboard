// Write your code here
import './index.css'

const MatchCard = props => {
  const {matchData} = props
  const {competingTeam, competingTeamLogo, matchStatus, result} = matchData
  const statusClassName = matchStatus === 'Won' ? 'won' : 'lost'
  return (
    <li className="list-item">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="logo"
      />
      <p className="competing-team">{competingTeam}</p>
      <p className="result">{result}</p>
      <p className={`match-status ${statusClassName}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
