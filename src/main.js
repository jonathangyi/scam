const prompt = require('prompt-sync')({ sigint: true });

// Your code goes here!
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Auction {
    constructor() {
        this.items = {};
    }

    async setup() {
        const numItems = parseInt(await this.prompt("Enter the number of items:"), 10);
        
        if (isNaN(numItems) || numItems < 10) {
            console.log("Error message: There must be at least 10 items in the auction.");
            return;
        }

        for (let i = 0; i < numItems; i++) {
            const itemNumber = await this.prompt(`Enter the item number for item ${i + 1}:`);
            const itemName = await this.prompt(`Enter the name for item ${i + 1}:`);
            const itemReservePrice = parseFloat(await this.prompt(`Enter the reserve price for ${itemName}:`));
            
            this.items[itemNumber] = {
                name: itemName,
                reservePrice: itemReservePrice,
                currentBid: 0,
                buyerNumber: ''
            };
        }
    }

    displayItems() {
        for (const [itemNumber, itemDetails] of Object.entries(this.items)) {
            console.log(`Item Number: ${itemNumber} | Name: ${itemDetails.name} | Current Bid: $${itemDetails.currentBid} | Bidder: ${itemDetails.buyerNumber}`);
        }
    }

    async placeBid() {
        const itemNumber = await this.prompt("Enter the item number you want to bid on:");
        
        if (!this.items[itemNumber]) {
            console.log("Item number not found!");
            return;
        }

        const buyerNumber = await this.prompt("Enter your buyer number:");
        const bidAmount = parseFloat(await this.prompt("Enter your bid amount:"));

        if (isNaN(bidAmount) || bidAmount <= this.items[itemNumber].currentBid) {
            console.log("Error message: Bid must be higher than the current highest bid.");
            return;
        }

        this.items[itemNumber].currentBid = bidAmount;
        this.items[itemNumber].buyerNumber = buyerNumber;
        console.log(`Bid accepted for item ${itemNumber} (${this.items[itemNumber].name}).`);
    }

    endAuction() {
        const soldItems = [];
        const unsoldItems = [];
        const noBids = [];

        for (const [itemNumber, itemDetails] of Object.entries(this.items)) {
            if (itemDetails.currentBid >= itemDetails.reservePrice && itemDetails.currentBid > 0) {
                soldItems.push({
                    itemNumber: itemNumber,
                    total: itemDetails.currentBid * 1.10
                });
            } else if (itemDetails.currentBid > 0) {
                unsoldItems.push({
                    itemNumber: itemNumber,
                    finalBid: itemDetails.currentBid
                });
            } else {
                noBids.push(itemNumber);
            }
        }

        console.log("\nTotal Fee for Sold Items:");
        for (const item of soldItems) {
            console.log(`Item ${item.itemNumber} (${this.items[item.itemNumber].name}) - $${item.total.toFixed(2)}`);
        }

        console.log("\nItems that did not meet the reserve price:");
        for (const item of unsoldItems) {
            console.log(`Item ${item.itemNumber} (${this.items[item.itemNumber].name}) - Final Bid: $${item.finalBid.toFixed(2)}`);
        }

        console.log("\nItems with no bids:");
        for (const itemNumber of noBids) {
            console.log(`Item ${itemNumber} (${this.items[itemNumber].name})`);
        }

        console.log("\nSummary:");
        console.log(`Number of Items Sold: ${soldItems.length}`);
        console.log(`Number of Items Unsold: ${unsoldItems.length}`);
        console.log(`Number of Items with No Bids: ${noBids.length}`);
    }

    prompt(question) {
        return new Promise(resolve => {
            rl.question(question, (answer) => {
                resolve(answer);
            });
        });
    }

    async menu() {
        while (true) {
            console.log("\nMenu:");
            console.log("1. Auction Setup");
            console.log("2. Display Items");
            console.log("3. Place Bid");
            console.log("4. End Auction");
            console.log("5. Exit");

            const choice = await this.prompt("Enter your choice: ");

            switch (choice) {
                case '1':
                    await this.setup();
                    break;
                case '2':
                    this.displayItems();
                    break;
                case '3':
                    await this.placeBid(); // Await, because placeBid now has asynchronous code
                    break;
                case '4':
                    this.endAuction();
                    break;
                case '5':
                    console.log("Goodbye!");
                    rl.close();
                    return;
                default:
                    console.log("Invalid choice!");
                    break;
            }
        }
    }
}

const auction = new Auction();
auction.menu();