const http = require('http');

const testCases = [
    {
        name: "Example A",
        data: ["a","1","334","4","R", "$"]
    },
    {
        name: "Example B", 
        data: ["2","a", "y", "4", "&", "-", "*", "5","92","b"]
    },
    {
        name: "Example C",
        data: ["A","ABcD","DOE"]
    }
];

function makeRequest(data) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({ data });
        
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: '/bfhl',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = http.request(options, (res) => {
            let responseData = '';
            
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(responseData);
                    resolve({
                        statusCode: res.statusCode,
                        data: parsed
                    });
                } catch (error) {
                    reject(error);
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.write(postData);
        req.end();
    });
}

async function runTests() {
    console.log('🚀 Starting API Tests...\n');

    console.log('Testing GET /bfhl...');
    try {
        const getResponse = await new Promise((resolve, reject) => {
            const req = http.request({
                hostname: 'localhost',
                port: 3000,
                path: '/bfhl',
                method: 'GET'
            }, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    resolve({
                        statusCode: res.statusCode,
                        data: JSON.parse(data)
                    });
                });
            });
            req.on('error', reject);
            req.end();
        });
        
        console.log(` GET Status: ${getResponse.statusCode}`);
        console.log(`Response:`, getResponse.data);
    } catch (error) {
        console.log(' GET test failed:', error.message);
    }
    
    console.log('\n' + '='.repeat(50) + '\n');

    // Test POST endpoints
    for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        console.log(`Testing ${testCase.name}...`);
        console.log(`Input:`, testCase.data);
        
        try {
            const response = await makeRequest(testCase.data);
            console.log(` Status Code: ${response.statusCode}`);
            console.log(`Response:`, JSON.stringify(response.data, null, 2));
        } catch (error) {
            console.log(` ${testCase.name} failed:`, error.message);
        }
        
        console.log('\n' + '-'.repeat(30) + '\n');
    }
    
    console.log(' Tests completed!');
}
console.log('Make sure your server is running on port 3000');
console.log('Run: npm start (in another terminal)\n');

setTimeout(runTests, 1000);
