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
        padding: '5px',
        background: 'white'
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
  const [deckCut, setDeckCut] = useState(randomNumberBetween(5, (numberOfDecks * 52) - 20))
  const [playerActiveHand, setPlayerActiveHand] = useState(0)
  const [playerHandIsBusted, setPlayerHandIsBusted] = useState([false])
  const [playerHasControl, setPlayerHasControl] = useState(true)

  function useHandTotal(cardState, handHasSoftAce){
    const [handTotal, setHandTotal] = useState(0)
    useEffect(() => {
      const newTotal = cardState.reduce((total, card) => {
        return (total + card.value)
      }, 0)
      setHandTotal(newTotal)
    })
    if (handHasSoftAce && handTotal <= 21) {
      return <div>{handTotal} or {handTotal - 10}</div>
    } else if (handHasSoftAce) {
      return <div>{handTotal - 10}</div>
    } else {
      return <div>{handTotal}</div>
    }
  }

  const PlayerTotal = () => {
    return useHandTotal(playerCardsState, playerHasSoftAce)
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
          justifyContent: 'space-between',
          height: '300px',
          background: 'green'
        }}
        >
          {playerCards}
        </div>
      </div>
    )
  }
  const shuffleDeck = (newCard) => {
    const newDeck = createDeckState(numberOfDecks)
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
    setDeckState(newDeckCards)
    setDeckCut(randomNumberBetween(5, (numberOfDecks * 52) - 20))
    alert('shuffled')
  }
  const deal = () => {
    setPlayerHandIsBusted([false])
    setPlayerHasControl(true)
    setPlayerCardsState([])
  }

  const playerHit = () => {
    const cardIndex = randomNumberBetween(0, deckState.length - 1)
    const newCard = deckState[cardIndex]
    if (deckState.length <= deckCut) {
      shuffleDeck(newCard)
    }

    if (newCard.cardType === 'ace' && playerTotal + newCard.value > 21) {//If you can't add 11 to total then ace must be 1
      newCard.value = 1
    }
    if (newCard.value === 11) {
      setPlayerHasSoftAce(true)
    }
    if (playerHasSoftAce && playerTotal + newCard.value > 21) {
      const newPlayerCards = playerCardsState.map((card) => {
        if (card.value === 11) {
          card.value = 1
        }
        return card
      }).concat(newCard)
      setPlayerCardsState(newPlayerCards)
      setPlayerHasSoftAce(false)
    } else {
      const newPlayerCards = playerCardsState.concat(newCard)
      setPlayerCardsState(newPlayerCards)
    }
  }

  useEffect(() => {
    const newTotal = playerCardsState.reduce((total, card) => {
      return (total + card.value)
    }, 0)
    setPlayerTotal(newTotal)
    if(newTotal>21){
      const newPlayerHandIsBusted = playerHandIsBusted.map((hand, i) => {
        if(i === playerActiveHand){
          return true
        }
      })
      setPlayerHandIsBusted(newPlayerHandIsBusted)
      setPlayerHasControl(false)
    }

    const cardsOnTable = playerCardsState

    const newDeckCards = deckState.filter((card) => {
      let cardIsInDeck = true
      cardsOnTable.forEach((newCard) => {
        if (newCard.id === card.id){
          cardIsInDeck = false
        }
      })
      return cardIsInDeck
    })
    setDeckState(newDeckCards)

  }, [playerCardsState])


  return (
    <div className="App">
      <PlayerTotal/>
      <PlayerCards/>
      <button
        onClick={() => { playerHit()}}
        style={playerHasControl ? {display: 'block'} : {display: 'none'}}
      >
        Hit
      </button>
      <button
        onClick={() => { deal()}}
        style={playerHasControl ? {display: 'none'} : {display: 'block'}}
      >
        Deal
      </button>
      <button
        onClick={() => { deal()}}
      >

      </button>
    </div>
  )
}

export default App
