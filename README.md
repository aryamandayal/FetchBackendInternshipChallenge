# FetchInternshipChallenge

## Running the Code

### Step 1: Install Node.js
You need to install Node.js, which can be downloaded from [this website](https://nodejs.org/).

### Step 2: Clone the Repository
Type in the following command into your terminal:

`git clone https://github.com/aryamandayal/FetchInternshipChallenge.git`


### Step 3: Install Dependencies
Navigate to the project folder with this command:

`cd FetchInternshipChallenge`

Run this command to install the necessary `express` and `body-parser` packages:

`npm install`

### Step 4: Run the Server
Start the server by running this command:

`node index.js`

This will start the server on port 8000. You should see the following message:

`Server is running on port 8000`

### Step 5: Test the API
You will now be able to test the API by sending HTTP requests to the following endpoints:

- **Add Points**: `POST /add`
- **Spend Points**: `POST /spend`
- **Get Balance**: `GET /balance`
