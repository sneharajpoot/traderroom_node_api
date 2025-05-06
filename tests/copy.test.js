// copy.test.js

const { addManager, removeManager, generateToken, mannagerLogin, addMaster, removeMaster, addUser, openTrade, closeOrder } = require('../controller/copy.controller.js');

// Mock Data
const mockManager = {
    "mt5mngid": 10020,
    "mngId": 10020,
    "serverIp": "access.tgshost.org:41843",
    "pasword": "roxzr6cj"

};


const mockTrade = {
    tradeData: {
        mloginid: 123456,
        loginid: 654321,
        dealid: 111,
        symbol: 'EURUSD',
        price: 1.2345,
        type: 1,
        volume: 0.1,
        comment: 'Test Trade',
        priceType: 0,
        positionID: 0
    },
    mngid: 'testManager',
    password: 'testPassword'
};

const mockOrder = {
    orderData: {
        positionId: 111,
        price: 1.2345
    },
    mngid: 'testManager',
    password: 'testPassword'
};

// Test Cases

describe('MT5TradeCopier Controller Functions', () => {
    it('should add a manager', async (done) => {
        try {
            // return done()

            const result = await addManager(mockManager);
            expect(result).toHaveProperty('mngId');
        } catch (error) {
            console.log("error", error.message || error)
            done(error)
        }
    });

    it('should login manager', async (done) => {

        try {
            // return done()

            const result = await managerLogin({ mngId: mockManager.mngId });
            expect(result).toHaveProperty('message', 'Manager logged in successfully');
            expect(result).toHaveProperty('mngId');
            done()
        } catch (error) {
            console.log("error", error.message || error)
            done(error)
        }
    });

    it('should add a master', async (done) => {
        try {
            // return done()

            const mockMasterData = {
                "masterid": 0,
                "masterAccountNumber": 0,
                "password": "string",
                "name": "string",
                "numSalves": 0,
                "salveseidt": true,
                "accountType": 0
            };
            const result = await addMaster(mockMasterData);
            expect(result).toHaveProperty('masterData');
            done()
        } catch (error) {

            console.log("error", error.message || error)
            done(error)
        }
    });


    it('should add a user', async () => {

        const mockUser = {
            "id": 0,
            "loginid": 0,
            "mloginid": 0,
            "message": "string",
            "type": 0,
            "tradeType": 0,
            "fixvolume": 0,
            "priceType": 0,
            "mutlipler": 0,
            "roundof": true,
            "minLot": true,
            "sptp": 0,
            "precentage": 0,
            "accountType": 0
        }
        const result = await addUser(mockUser);
        expect(result).toHaveProperty('userData');
    });

    it('should remove a master', async (done) => {
        try {
            return done()

            const result = await removeMaster({ id: 1 });
            expect(result).toHaveProperty('message', 'Master removed successfully');
            done()
        } catch (error) {
            console.log("error", error.message || error)
            done(error)
        }
    });
    it('should remove a removeManager', async (done) => {
        try {
            return done()

            const result = await removeManager({ id: 1 });
            expect(result).toHaveProperty('message', 'Master removed successfully');
            done()
        } catch (error) {
            console.log("error", error.message || error)
            done(error)
        }
    });

    // it('should generate a token', async () => {
    //     const result = await generateToken();
    //     expect(result).toHaveProperty('token');
    // });


    // it('should add a user', async () => {
    //     const result = await addUser(mockUser);
    //     expect(result).toHaveProperty('userData');
    // });

    // it('should open a trade', async () => {
    //     const result = await openTrade(mockTrade);
    //     expect(result).toHaveProperty('tradeData');
    // });

    // it('should close an order', async () => {
    //     const result = await closeOrder(mockOrder);
    //     expect(result).toHaveProperty('orderData');
    // });
});
