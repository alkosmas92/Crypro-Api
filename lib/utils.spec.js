
const {getCountOfCoin ,getAllCryptos ,getCoin ,getDescription} = require('../server/src/services/cryptoService')


describe('getCountOfCoin', () => {
    test('Find count of coins', async() => {
        const myNum = await getCountOfCoin()
        expect(typeof (myNum)).toBe("number")
    })
})

describe('get Cryptos', () => {
    test('Check count of coins', async() => {
        const count = 10;
        const current = 5
        const result = await getAllCryptos(count  ,current)
        expect(result.length).toEqual(count )
    })
})


describe('getCoin', () => {
    test('Check count of coins', async() => {
        let coinId = "bitcoin"
        const result = await getCoin(coinId)
        console.log(result)
         expect(result.length).toEqual(7  )
    })
})
describe('getDescription', () => {
    test('Check Description', async() => {
        let coinId = "bitcoin"
        const result = await getDescription(coinId)
        console.log(result)
         expect(typeof (result)).toBe("string")
    })
})

