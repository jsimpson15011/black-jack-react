const createDeckState = (numberOfDecks) => {
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

export default createDeckState