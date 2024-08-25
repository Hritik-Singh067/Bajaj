const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors')
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors())
app.use((req, res, next) => {
    if (req.method === 'POST' && !req.is('application/json')) {
        req.headers['content-type'] = 'application/json';
    }
    next();
});

const port = process.env.PORT || 3000;

// POST method endpoint
app.post('/bfhl', (req, res) => {
    const data = req.body.data;

    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: 'Invalid data format' });
    }

    // Hardcoded response details
    const response = {
        is_success: true,
        user_id: 'john_doe_17091999',
        email: 'john@xyz.com',
        roll_number: 'ABCD123',
        numbers: data.filter(item => !isNaN(item) && item.trim() !== ''),
        alphabets: data.filter(item => isNaN(item) && item.trim() !== ''),
        highest_lowercase_alphabet: getHighestLowercaseAlphabet(data)
    };

    res.json(response);
});

function getHighestLowercaseAlphabet(array) {
    const lowercaseAlphabets = array.filter(item => /^[a-z]$/.test(item));
    if (lowercaseAlphabets.length === 0) {
        return [];
    }
    const highest = Math.max(...lowercaseAlphabets.map(item => item.charCodeAt(0)));
    return [String.fromCharCode(highest)];
}

// GET method endpoint
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: '1' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
