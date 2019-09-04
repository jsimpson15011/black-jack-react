import React, {useState, useEffect} from 'react'
import createDeckState from './functions/create-deck-state'

const Card = (props) => {
  let cardColor = 'black'
  if (props.suite === 'h' || props.suite === 'd') {
    cardColor = 'red'
  }
  return (
    <div
      className={props.suite}
      style={{
        color: cardColor,
        border: 'solid black 2px',
        padding: '5px'
      }}
    >
      <p>{props.value}</p>
      <p>{props.suite}</p>
    </div>
  )
}

const randomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

const App = () => {
  const [numberOfDecks, setNumberOfDecks] = useState(1)
  const initialDeck = createDeckState(numberOfDecks)
  const [deckState, setDeckState] = useState(initialDeck)
  const [playerCardsState, setPlayerCardsState] = useState([])

  const PlayerCards = () => {
    const playerCards = playerCardsState.map((card) => {
      return (
        <Card
          value={card.value}
          suite={card.suite}
          key={card.id}
        />
      )
    })

    return (
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
        >
          {playerCards}
        </div>
      </div>
    )
  }

  const playerHit = () => {
    if (deckState.length === 0) {
      const newDeck = createDeckState(numberOfDecks)
      const cardIndex = randomNumberBetween(0, newDeck.length - 1)
      const newPlayerCards = playerCardsState.concat(newDeck[cardIndex])
      const newDeckCards = newDeck.filter((card) => {
        let cardNotOnTable = true
        if (card.id === newDeck[cardIndex].id) {
          cardNotOnTable = false
          return cardNotOnTable
        }
        for (let playerCard of playerCardsState) {
          if (playerCard.id === card.id) {
            cardNotOnTable = false
          }
        }
        return cardNotOnTable
      })
      if (newDeckCards.length === 0) {
        alert('out of cards')
        return
      }
      setDeckState(newDeckCards)
      setPlayerCardsState(newPlayerCards)
      alert('shuffled')
      return
    }

    const cardIndex = randomNumberBetween(0, deckState.length - 1)
    const newPlayerCards = playerCardsState.concat(deckState[cardIndex])
    const newDeckCards = deckState.filter((card) => {
      return card.id !== deckState[cardIndex].id
    })
    setDeckState(newDeckCards)
    setPlayerCardsState(newPlayerCards)
  }

  return <div className="App">
    <PlayerCards/>
    <button onClick={() => playerHit()}>
      Hit
    </button>
  </div>
}

export default App
