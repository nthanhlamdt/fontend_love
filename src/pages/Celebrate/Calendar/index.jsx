import { useState, useEffect } from 'react'

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    // Update currentDate to the first day of the current month
    const date = new Date()
    setCurrentDate(date)
  }, [])

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days = []

    // Fill in days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }

    // Fill in the days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(i)
    }

    return days
  }

  const daysInMonth = getDaysInMonth()
  const today = new Date()
  const isToday = (day) => {
    return day === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear()
  }

  const handlePrevious = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() - 1)
    setCurrentDate(newDate)
  }

  const handleNext = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + 1)
    setCurrentDate(newDate)
  }

  return (
    <div className="max-w-md mx-auto mt-4 p-4 border border-pink-300 rounded-lg shadow-lg bg-white">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 border border-pink-300 rounded-md bg-pink-100 text-pink-600 hover:bg-pink-200"
        >
          Previous
        </button>
        <h2 className="text-xl font-bold text-pink-600">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <button
          onClick={handleNext}
          className="px-4 py-2 border border-pink-300 rounded-md bg-pink-100 text-pink-600 hover:bg-pink-200"
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center font-semibold text-pink-600">
        {daysOfWeek.map(day => (
          <div key={day} className="p-2 border-b border-pink-200">
            {day}
          </div>
        ))}
        {daysInMonth.map((day, index) => (
          <div
            key={index}
            className={`p-2 ${day ? 'hover:bg-pink-100' : 'text-gray-400'} ${day && isToday(day) ? 'bg-pink-200 font-bold' : ''}`}
          >
            {day || ''}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar
