// Write your code here
import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props
  const {
    competingTeam,
    competingTeamLogo,
    date,
    firstInnings,
    manOfTheMatch,
    result,
    secondInnings,
    umpires,
    venue,
  } = latestMatchDetails

  return (
    <div className="latest-match-container">
      <div className="match-details">
        <div className="content-container">
          <p className="name">{competingTeam}</p>
          <p className="date">{date}</p>
          <p className="small-text">{venue}</p>
          <p className="small-text">{result}</p>
        </div>
        <div>
          <img
            src={competingTeamLogo}
            alt={`latest match ${competingTeam}`}
            className="competing-team-logo"
          />
        </div>
      </div>
      <hr className="separator" />
      <p className="text">First Innings</p>
      <p className="small-text">{firstInnings}</p>
      <p className="text">Second Innings</p>
      <p className="small-text">{secondInnings}</p>
      <p className="text">Man Of The Match</p>
      <p className="small-text">{manOfTheMatch}</p>
      <p className="text">Umpires</p>
      <p className="small-text">{umpires}</p>
    </div>
  )
}

export default LatestMatch
