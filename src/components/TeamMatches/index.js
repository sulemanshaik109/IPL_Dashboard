import {Component} from 'react'
import {Link} from 'react-router-dom'
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import Loader from 'react-loader-spinner'
import './index.css'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {
    latestMatchDetails: {},
    recentMatches: [],
    teamBannerUrl: '',
    isLoading: true,
    selectedTeam: '',
  }

  componentDidMount() {
    this.getRecentMatchesData()
  }

  getRecentMatchesData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const formattedLatestMatchDetails = {
      competingTeam: data.latest_match_details.competing_team,
      competingTeamLogo: data.latest_match_details.competing_team_logo,
      date: data.latest_match_details.date,
      firstInnings: data.latest_match_details.first_innings,
      manOfTheMatch: data.latest_match_details.man_of_the_match,
      result: data.latest_match_details.result,
      secondInnings: data.latest_match_details.second_innings,
      umpires: data.latest_match_details.umpires,
      venue: data.latest_match_details.venue,
    }
    const formattedRecentMatches = data.recent_matches.map(eachMatch => ({
      competingTeam: eachMatch.competing_team,
      competingTeamLogo: eachMatch.competing_team_logo,
      matchStatus: eachMatch.match_status,
      result: eachMatch.result,
      id: eachMatch.id,
    }))
    const formattedTeamBannerUrl = data.team_banner_url
    this.setState({
      latestMatchDetails: formattedLatestMatchDetails,
      recentMatches: formattedRecentMatches,
      teamBannerUrl: formattedTeamBannerUrl,
      isLoading: false,
      selectedTeam: id,
    })
  }

  renderRecentMatches = () => {
    const {recentMatches} = this.state

    const lostMatches = recentMatches.filter(
      eachResult => eachResult.matchStatus === 'Lost',
    )
    const wonMatches = recentMatches.filter(
      eachResult => eachResult.matchStatus === 'Won',
    )
    const drawnMatches = recentMatches.filter(
      eachResult => eachResult.matchStatus === 'Drawn',
    )
    const data = [
      {
        count: lostMatches.length,
        result: 'Lost',
      },
      {
        count: wonMatches.length,
        result: 'Won',
      },
      {
        count: drawnMatches.length,
        result: 'Drawn',
      },
    ]
    return (
      <ul className="recent-matches-container">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              cx="70%"
              cy="40%"
              data={data}
              startAngle={0}
              endAngle={360}
              innerRadius="40%"
              outerRadius="70%"
              dataKey="count"
            >
              <Cell name="Lost" fill="#fecba6" />
              <Cell name="Won" fill="#b3d23f" />
              <Cell name="Drawn" fill="#a44c9e" />
            </Pie>
            <Legend
              iconType="circle"
              layout="vertical"
              verticalAlign="middle"
              align="right"
            />
          </PieChart>
        </ResponsiveContainer>
        {recentMatches.map(each => (
          <MatchCard key={each.id} matchData={each} />
        ))}
      </ul>
    )
  }

  renderTeamBanner = () => {
    const {teamBannerUrl, latestMatchDetails} = this.state

    return (
      <>
        <img src={teamBannerUrl} alt="team banner" className="banner-img" />
        <p className="sub-heading">Latest Matches</p>
        <LatestMatch latestMatchDetails={latestMatchDetails} />
        {this.renderRecentMatches()}
        <Link to="/" className="back-link">
          <button type="button" className="back-btn">
            Back
          </button>
        </Link>
      </>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading, selectedTeam} = this.state
    const selectedTeamClassName = `${selectedTeam.toLowerCase()}-team`
    return (
      <div className={`team-container ${selectedTeamClassName}`}>
        {isLoading ? this.renderLoader() : this.renderTeamBanner()}
      </div>
    )
  }
}

export default TeamMatches
