import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from "ai";
import { functionSchemas } from '@/lib/functions/schemas';

export async function POST(req: Request) {
  const json = await req.json()
  const { messages } = json
  
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  })

  const openai = new OpenAIApi(configuration)

  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
    functions: functionSchemas
  });

  const stream = OpenAIStream(res)

  return new StreamingTextResponse(stream)
}