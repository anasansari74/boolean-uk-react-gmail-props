import { useState } from 'react'

import initialEmails from './data/emails'

import './App.css'
import Header from './components/Header'
import Nav from './components/Nav'
import Main from './components/Main'

const getReadEmails = emails => emails.filter(email => !email.read)

const getStarredEmails = emails => emails.filter(email => email.starred)

function App() {
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState('inbox')

  const toggleStar = targetEmail => {
    const updatedEmails = emails =>
      emails.map(email =>
        email.id === targetEmail.id
          ? { ...email, starred: !email.starred }
          : email
      )
    setEmails(updatedEmails)
  }

  const toggleRead = targetEmail => {
    const updatedEmails = emails =>
      emails.map(email =>
        email.id === targetEmail.id ? { ...email, read: !email.read } : email
      )
    setEmails(updatedEmails)
  }

  let filteredEmails = emails

  if (hideRead) filteredEmails = getReadEmails(filteredEmails)

  if (currentTab === 'starred')
    filteredEmails = getStarredEmails(filteredEmails)

  return (
    <div className="app">
      <Header />
      <Nav
        emails={emails}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        setHideRead={setHideRead}/>
      <Main
        filteredEmails={filteredEmails}
        toggleRead={toggleRead}
        toggleStar={toggleStar}/>
    </div>
  )
}

export default App
