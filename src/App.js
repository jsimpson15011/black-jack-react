import React, {useState, useEffect} from 'react'

const Card = (props) => {
  return (
    <div className={props.suite}>
      {props.value}
    </div>
  )
}

const randomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

const App = () => {
  const numberOfDecks = 1
  const initialDeckState = (numberOfDecks) => {
    const cards = []
    for (let i = 1; i <= numberOfDecks; i++) {
      const deckNumber = i
      for (let i = 0; i <= 3; i++) {
        let suite
        switch (i) {
          case 0:
            suite = 's'
            break
          case 1:
            suite = 'c'
            break
          case 2:
            suite = 'd'
            break
          case 3:
            suite = 'h'
            break
        }
        for (let i = 1; i <= 13; i++) {
          let value
          let cardType = 'number'
          switch (i) {
            case 1:
              cardType = 'ace'
              value = 11
              break
            case 11:
              cardType = 'jack'
              value = 10
              break
            case 12:
              cardType = 'queen'
              value = 10
              break
            case 13:
              cardType = 'king'
              value = 10
              break
            default:
              value = i
          }
          const card = {
            suite: suite,
            value: value,
            cardType: cardType,
            id: `${suite}${i}d-${deckNumber}`
          }
          cards.push(card)
        }
      }
    }
    return cards
  }
  const initialDeck = initialDeckState(numberOfDecks)

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
        {playerCards}
      </div>
    )
  }

  const playerHit = () => {
    const cardIndex = randomNumberBetween(0, deckState.length - 1)
    const newPlayerCards = playerCardsState.concat(deckState[cardIndex])
    const newDeckCards = deckState.filter((card)=>{
      return card.id !== deckState[cardIndex].id
    })
    setDeckState(newDeckCards)
    setPlayerCardsState(newPlayerCards)
    console.log(deckState.length)
  }

  return <div className="App">
    <PlayerCards/>
    <button onClick={() => {
      playerHit()
    }}>
      Hit
    </button>
  </div>
}

export default App
