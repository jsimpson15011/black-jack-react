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
  const [playerHasSoftAce, setPlayerHasSoftAce] = useState(false)//This state shows whether the player
  const [playerTotal, setPlayerTotal] = useState(0)

  const PlayerTotal = () => {
    if (playerCardsState.length === 0){
      return <div>0</div>
    }
    const playerTotal = playerCardsState.reduce((total, card) => {
      return (
        total + card.value
      )
    },0)

    console.log(playerHasSoftAce)
    if (playerHasSoftAce && playerTotal < 21){
      setPlayerTotal(playerTotal)
      return <div>{playerTotal} or {playerTotal - 10}</div>
    } else if(playerHasSoftAce){
      setPlayerTotal(playerTotal - 10)
      setPlayerHasSoftAce(false)
      return <div>{playerTotal - 10}</div>
    }
    else{
      setPlayerTotal(playerTotal)
      return <div>{playerTotal}</div>
    }
  }

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
      const newCard = newDeck[cardIndex]
      const newPlayerCards = playerCardsState.concat(newCard)
      const newDeckCards = newDeck.filter((card) => {
        let cardNotOnTable = true
        if (card.id === newCard.id) {
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
    const newCard = deckState[cardIndex]

    if (newCard.cardType === 'ace' && playerTotal + newCard.value > 21){//If you can't add 11 to total then ace must be 1
      newCard.value = 1
    }
    if(newCard.value === 11){
      setPlayerHasSoftAce(true)
    }
    const newPlayerCards = playerCardsState.concat(newCard)
    const newDeckCards = deckState.filter((card) => {
      return card.id !== newCard.id
    })

    setDeckState(newDeckCards)
    setPlayerCardsState(newPlayerCards)
  }

  return <div className="App">
    <PlayerTotal/>
    <PlayerCards/>
    <button onClick={() => playerHit()}>
      Hit
    </button>
  </div>
}

export default App
