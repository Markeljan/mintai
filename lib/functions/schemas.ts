import { ChatRequestOptions } from 'ai'

export const functionSchemas: ChatRequestOptions['functions'] = [
  {
    name: 'text_to_image',
    description: `This function generates an image from text.  Return the value as an image in markdown.`,
    parameters: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          description: 'Text to generate an image from text.'
        }
      },
      required: ['text']
    }
  }
]
