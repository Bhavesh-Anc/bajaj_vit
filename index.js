const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const USER_DETAILS = {
    full_name: "bhavesh_anchalia", 
    birth_date: "18052003", 
    email: "bhavesh.anchalia2022@vitstudent.ac.in", 
    roll_number: "22BCE0502" 
};
function isNumeric(str) {
    return /^\d+$/.test(str);
}

function isAlphabetic(str) {
    return /^[a-zA-Z]+$/.test(str);
}

function processData(data) {
    const result = {
        is_success: true,
        user_id: `${USER_DETAILS.full_name}_${USER_DETAILS.birth_date}`,
        email: USER_DETAILS.email,
        roll_number: USER_DETAILS.roll_number,
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: "0",
        concat_string: ""
    };

    let numberSum = 0;
    let alphabetChars = [];

    data.forEach(item => {
        const str = String(item);
        
        if (isNumeric(str)) {
            const num = parseInt(str);
            numberSum += num;
            
            if (num % 2 === 0) {
                result.even_numbers.push(str);
            } else {
                result.odd_numbers.push(str);
            }
        }
        else if (isAlphabetic(str)) {
            result.alphabets.push(str.toUpperCase());
            for (let char of str) {
                alphabetChars.push(char);
            }
        }
        else {
            result.special_characters.push(str);
        }
    });

    result.sum = String(numberSum);

    if (alphabetChars.length > 0) {
        const reversedChars = alphabetChars.reverse();
        let concatString = "";
        
        for (let i = 0; i < reversedChars.length; i++) {
            if (i % 2 === 0) {
                // Even index: uppercase
                concatString += reversedChars[i].toUpperCase();
            } else {
                // Odd index: lowercase
                concatString += reversedChars[i].toLowerCase();
            }
        }
        result.concat_string = concatString;
    }

    return result;
}

app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1,
        message: "BFHL API is working! Use POST method with data array to process."
    });
});

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!data) {
            return res.status(400).json({
                is_success: false,
                message: "Missing 'data' field in request body"
            });
        }

        if (!Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: "'data' must be an array"
            });
        }

        const result = processData(data);

        res.status(200).json(result);

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            message: "Internal server error occurred"
        });
    }
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

app.use('*', (req, res) => {
    res.status(404).json({
        is_success: false,
        message: `Route ${req.method} ${req.originalUrl} not found. Use POST /bfhl to process data.`
    });
});

app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        is_success: false,
        message: "Internal server error"
    });
});

app.listen(PORT, () => {
    console.log(`🚀 BFHL API Server running on port ${PORT}`);
    console.log(`📡 POST endpoint: http://localhost:${PORT}/bfhl`);
    console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
