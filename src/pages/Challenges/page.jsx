import CompletedChallenges from './CompletedChallenges'
import CoupleChallenge from './CoupleChallenge'
import IndividualChallenges from './IndividualChallenges'
import Leaderboard from './Leaderboard'

export default function Challenges() {
  return (
    <div className="flex flex-col min-h-screen bg-pink-50">
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-8">
            <CoupleChallenge />
            <IndividualChallenges />
          </div>
          <div className="flex-1 space-y-8">
            <Leaderboard />
            <CompletedChallenges />
          </div>
        </div>
      </main>
    </div>
  )
}
