const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const PORT = 8081;

const app = express();

app.use(express.json());
app.use(cors());

app.post("/convert", async (req, res) => {
    try{
        // const { inputCode, language } = req.body.data;
        const {inputCode, language} = req.body;

        const prompt = `Convert the code ${inputCode} in ${language} language`;

        const response = await axios.post(`https://api.openai.com/v1/engines/text-davinci-002/completions`, { 
            prompt,
            max_tokens: 2000
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const convertedCode = response.data.choices[0].text.trim();
        res.send({convertedCode});
    }
    catch(err){
        console.log("Error converting the code");
        res.status(500).send({ error: 'An error occurred while converting the code.' });
    }
});

app.post("/debug", async (req, res) => {
    try{
        const inputCode = req.body;

        const prompt = `Debug the following code and provide steps to resolve the issues in the given code:-\n\n ${inputCode}`;

        const response = await axios.post(`https://api.openai.com/v1/engines/text-davinci-002/completions`, { 
            prompt,
            max_tokens: 2000
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const convertedCode = response.data.choices[0].text.trim();
        res.send({convertedCode});
    }
    catch(err){
        console.log("Error debugging the code");
        res.status(500).send({ error: 'An error occurred while debugging the code.' });
    }
});

app.post("/quality-check", async (req, res) => {
    try{
        const inputCode = req.body;

        const prompt = `Please provide a code quality assessment and mention in detail where the improvements can be done in the given code \n ${inputCode} \n. Consider the following parameters: \n 
        1. Code Consistency: Evaluate the code for consistent coding style, naming conventions, and formatting. \n 
        2. Code Performance: Assess the code for efficient algorithms, optimized data structures, and overall performance considerations.\n 
        3. Code Documentation: Review the code for appropriate comments, inline documentation, and clear explanations of complex logic. \n 
        4. Error Handling: Examine the code for proper error handling and graceful error recovery mechanisms. \n 
        5. Code Testability: Evaluate the code for ease of unit testing, mocking, and overall testability. \n 
        6. Code Modularity: Assess the code for modular design, separation of concerns, and reusability of components. \n 
        7. Code Complexity: Analyze the code for excessive complexity, convoluted logic, and potential code smells. \n 
        8. Code Duplication: Identify any code duplication and assess its impact on maintainability and readability. \n 
        9. Code Readability: Evaluate the code for readability, clarity, and adherence to coding best practices. \n 
        Please provide a summary of the code quality assessment and a report showing the percentage-wise evaluation for each parameter mentioned above.`;

        const response = await axios.post(`https://api.openai.com/v1/engines/text-davinci-002/completions`, { 
            prompt,
            max_tokens: 2000
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const convertedCode = response.data.choices[0].text.trim();
        console.log(convertedCode);
        res.send({convertedCode});
    }
    catch(err){
        console.log("Error in doing quality-check of the code");
        res.status(500).send({ error: 'An error occurred while doing quality-check of the code.' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});