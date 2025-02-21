import {ChatOpenAI} from '@langchain/openai';
import {PromptTemplate} from '@langchain/core/prompts';
import {StringOutputParser} from '@langchain/core/output_parsers';
import {config} from 'dotenv';
import {Request, Response} from 'express';

config();

export const openaiApiKey = process.env.OPENAI_API;

export const llm = new ChatOpenAI({
  openAIApiKey: openaiApiKey,
  model: 'gpt-4o-mini',
});

const finalTemplate = PromptTemplate.fromTemplate(
  `You are an AI assistant. Given the JSON response from an API, summarize the key information in a concise manner to make a diagnosis. Do not generate output in a markdown format and keep the output concise
  
  JSON Response:
  {response}

  Summary:`,
);
async function fetchSteps(): Promise<any> {
  try {
    const response = await fetch(
      'http://lunatux.tailc62454.ts.net:3000/api/v1/user/steps',
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching steps data:', error);
  }
}

// Fetch Blood Pressure Data
async function fetchBloodPressure(): Promise<any> {
  try {
    const response = await fetch(
      'http://lunatux.tailc62454.ts.net:3000/api/v1/user/bloodPressure',
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blood pressure data:', error);
  }
}

// Fetch Blood Glucose Data
async function fetchBloodGlucose(): Promise<any> {
  try {
    const response = await fetch(
      'http://lunatux.tailc62454.ts.net:3000/api/v1/user/bloodGlucose',
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blood glucose data:', error);
  }
}

export const getSummary = async (req: Request, res: Response): Promise<any> => {
  try {
    // Await the data fetching
    const steps = await fetchSteps();
    const bp = await fetchBloodPressure();
    const bg = await fetchBloodGlucose();

    const response = `{
        "medicines": ["Metformin", "Glimepiride"],
        "prescriptions": [
          {
            "doctor": "Dr. Sharma",
            "patient": "John Doe",
            "medicines": ["Metformin", "Glimepiride"],
            "date": "2025-02-22"
          }
        ],
        "steps": ${JSON.stringify(steps)},
        "bloodPressure": ${JSON.stringify(bp)},
        "bloodGlucose": ${JSON.stringify(bg)}
      }`;

    const formattedPrompt = await finalTemplate.format({response});

    const chain = llm.pipe(new StringOutputParser());
    const finalResponse = await chain.invoke(formattedPrompt);

    console.log(finalResponse);
    return res.json(finalResponse);
  } catch (error) {
    console.error('Error in getSummary:', error);
    return res.status(500).json({error: 'Internal Server Error'});
  }
};
