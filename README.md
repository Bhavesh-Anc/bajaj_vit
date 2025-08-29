BFHL REST API - VIT Full Stack Assignment
A REST API that processes an array of mixed data and returns categorized results including numbers, alphabets, and special characters with additional processing. Features

POST /bfhl: Main endpoint that processes input data
GET /bfhl: Health check endpoint
Categorizes data into even numbers, odd numbers, alphabets, and special characters
Returns sum of all numbers
Creates concatenated string from alphabets in reverse order with alternating caps
Proper error handling and validation


Setup Instructions
1. Clone the Repository
bashgit clone <your-repo-url>
cd bfhl-api
2. Install Dependencies
bashnpm install
3. Configure Your Details
Edit index.js and update the USER_DETAILS object:
4. Run Locally
bash# Development mode with auto-reload
npm run dev
# Production mode
npm start
5. Test the API
bashnpm test

API Documentation
POST /bfhl
Processes an array of mixed data and returns categorized results.

Deployment Options
 Vercel (Recommended)

Install Vercel CLI: npm i -g vercel
Run: vercel
Follow the prompts
Your API will be available at: https://bfhl-api-vit.vercel.app/bfhl


Testing Examples
Example 1
Input: ["a","1","334","4","R", "$"]
Expected Output:

Even numbers: ["334","4"]
Odd numbers: ["1"]
Alphabets: ["A","R"]
Special characters: ["$"]
Sum: "339"
Concat string: "Ra"

Example 2
Input: ["2","a", "y", "4", "&", "-", "*", "5","92","b"]
Expected Output:

Even numbers: ["2","4","92"]
Odd numbers: ["5"]
Alphabets: ["A", "Y", "B"]
Special characters: ["&", "-", "*"]
Sum: "103"
Concat string: "ByA"

Example 3
Input: ["A","ABcD","DOE"]
Expected Output:

Even numbers: []
Odd numbers: []
Alphabets: ["A","ABCD","DOE"]
Special characters: []
Sum: "0"
Concat string: "EoDdCbAa"

