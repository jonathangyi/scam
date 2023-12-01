# Auction System

*This is the final project for "Basic Programming with Javascript" Course aimed to give new joiners a chance to put everything they learned so far into use*

Details can be seen in `task.pdf`

Changes should be made to `src/main.js`

### Getting Started
Install dependencies
```bash
npm install
```

Run the program
```bash
npm run start
```


### How to check your program?

#### Task 1: Auction Setup

- The program validates user input for the number of items, ensuring it's a whole number and at least 10.
- The program collects and accurately stores information for each item as prompted.
- The inital bid is set to 0, and the buyer number is set to ''.


#### Task 2: Buyer Bids

- The program correctly displays all item information.
- When a user wants to place a bid, the program requests their buyer number and bid amount.
- If a user's bid is lower or equal to the current highest bid, the program rejects it and prompts for a higher bid.
- Valid bids replace previous ones along with the buyer number.
- Users can place multiple bids on the same item.


#### Task 3: End of Auction

- The program identifies items that have met their reserve prices and calculates a 10% fee on the final bid.
- The program recognizes items that did not meet the reserve price but received bids.
- The program identifies items that received no bids.
- For sold items, the program accurately displays their item numbers and the final prices (including the 10% tax).
- For unsold items, the program correctly displays their item numbers and the final bid amounts.
- For items with no bids, the program accurately displays their item numbers.
- The program provides correct counts for the number of items sold, unsold, and with no bids, which should match the total number of items.



### Sample Auction Item Setup:
| Item Number | Description       | Reserve Price |
| ----------- | ----------------- | ------------- |
| 101         | Antique Chair     | $200          |
| 102         | Painting           | $500          |
| 103         | Collectible Toy   | $100          |
| 104         | Vintage Watch     | $800          |
| 105         | Jewelry Set       | $750          |
| 106         | Rare Coin          | $300          |
| 107         | Antique Book       | $150          |
| 108         | Vintage Camera  | $250          |
| 109         | Art Sculpture    | $1000        |
| 110         | Classic Car        | $15000      |


### Test Scenarios
| Task | Test Case Description          | Input                                             | Expected Output                                            |
| ---- | ------------------------------ | ------------------------------------------------- | ---------------------------------------------------------- |
| Task 1 | Validate minimum items       | Number of items: 5                               | Error message: "There must be at least 10 items in the auction." |
| Task 1 | Record item information      | Number of items: 10                              | Program prompts for item information 10 times and records it correctly. |
| Task 2 | Display item information     | -                                                 | Program displays all item information accurately. |
| Task 2 | Place valid bid              | Buyer Number: 001, Item Number: 101, Bid: $250   | Bid accepted for item 101 (Antique Chair). |
| Task 2 | Reject lower bid             | Buyer Number: 002, Item Number: 101, Bid: $220   | Error message: "Bid must be higher than the current highest bid." |
| Task 2 | Place multiple bids          | Buyer Number: 002, Item Number: 102, Bid: $600   | Bid accepted for item 102 (Painting). |
| Task 2 | Place bid on different items | Buyer Number: 003, Item Number: 103, Bid: $50    | Bid accepted for item 103 (Collectible Toy). |
| Task 3 | Calculate fee for sold item  | Auction results: Item 102 (Painting) sold for $600 | Total Fee for Sold Items: $660 | (corrected) |
| Task 3 | Identify unsold items        | Auction results: Item 101 (Antique Chair) did not meet reserve price, Final Bid: $180 | Items that did not meet the reserve price: Item 101 (Antique Chair) - Final Bid: $180 |
| Task 3 | Identify items with no bids  | Auction results: Item 103 (Collectible Toy) received no bids | Items with no bids: Item 103 (Collectible Toy) |
| Task 3 | Display counts               | Auction results: Sold - 1, Unsold - 1, No Bids - 1 | Number of Items Sold: 1, Number of Items Unsold: 1, Number of Items with No Bids: 1 |
