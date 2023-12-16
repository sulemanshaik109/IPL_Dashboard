import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import TeamCard from '../TeamCard'

const teamsApiUrl = 'https://apis.ccbp.in/ipl'

class Home extends Component {
  state = {teamsList: [], isLoading: true}

  componentDidMount() {
    this.getTeamsList()
  }

  getTeamsList = async () => {
    const response = await fetch(teamsApiUrl)
    const data = await response.json()
    const {teams} = data
    const updatedData = teams.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
    }))
    this.setState({teamsList: updatedData, isLoading: false})
  }

  renderHomeRoute = () => (
    <>
      <div className="logo-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
          alt="ipl logo"
          className="ipl-logo"
        />
        <h1 className="heading">IPL Dashboard</h1>
      </div>
      {this.renderTeamsList()}
    </>
  )

  renderTeamsList = () => {
    const {teamsList} = this.state

    return (
      <ul className="teams-list-container">
        {teamsList.map(teamDetails => (
          <TeamCard key={teamDetails.id} teamDetails={teamDetails} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="home-container">
        {isLoading ? this.renderLoader() : this.renderHomeRoute()}
      </div>
    )
  }
}

export default Home
