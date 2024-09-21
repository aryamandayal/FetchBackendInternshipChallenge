const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

let transactions = [];
let payerBalances = {};

app.use(bodyParser.json());

// Add points endpoint
app.post('/add', (req, res) => {
  const { payer, points, timestamp } = req.body;

  // Update payer balance
  if (!payerBalances[payer]) {
    payerBalances[payer] = 0;
  }
  payerBalances[payer] += points;

  // Add the transaction to the list
  transactions.push({ payer, points, timestamp });
  transactions.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  res.sendStatus(200);
});

// Spend points endpoint
app.post('/spend', (req, res) => {
  const { points } = req.body;
  let pointsToSpend = points;
  const spendLog = [];

  const totalPoints = Object.values(payerBalances).reduce((acc, curr) => acc + curr, 0);

  if (pointsToSpend > totalPoints) {
    return res.status(400).send('Not enough points');
  }

  for (const transaction of transactions) {
    if (pointsToSpend <= 0) break;

    if (transaction.points <= 0 || payerBalances[transaction.payer] <= 0) continue;

    const deductPoints = Math.min(transaction.points, pointsToSpend);

    payerBalances[transaction.payer] -= deductPoints;
    spendLog.push({ payer: transaction.payer, points: -deductPoints });
    pointsToSpend -= deductPoints;
  }

  res.status(200).json(spendLog);
});

// Get balance endpoint
app.get('/balance', (req, res) => {
  res.status(200).json(payerBalances);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
