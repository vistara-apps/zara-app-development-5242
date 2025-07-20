import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "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",
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export const findRelevantVerses = async (query, scriptures = ['bible', 'quran', 'bhagavad-gita', 'ramayana']) => {
  try {
    const prompt = `
    You are a spiritual advisor with deep knowledge of major world scriptures. A person is seeking guidance for the following concern:

    "${query}"

    Please provide 3-4 relevant verses from the following scriptures: ${scriptures.join(', ')}. 
    For each verse, provide:
    1. The exact verse text
    2. The scripture source and reference
    3. A practical explanation of how this verse applies to their situation
    4. Actionable spiritual guidance

    Format your response as a JSON array with the following structure:
    [
      {
        "verse": "exact verse text",
        "reference": "Scripture Name Chapter:Verse",
        "scripture": "scripture name",
        "explanation": "detailed explanation",
        "guidance": "practical application"
      }
    ]
    `;

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: "You are a compassionate spiritual advisor with deep knowledge of world religions and scriptures. Provide thoughtful, respectful guidance that honors all faith traditions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const response = completion.choices[0].message.content;
    
    try {
      return JSON.parse(response);
    } catch (parseError) {
      // Fallback if JSON parsing fails
      return [{
        verse: "Be still and know that I am God.",
        reference: "Psalm 46:10",
        scripture: "Bible",
        explanation: "This verse reminds us to find peace in quiet reflection and trust in divine wisdom.",
        guidance: "Take time for meditation and prayer when facing uncertainty."
      }];
    }
  } catch (error) {
    console.error('Error finding verses:', error);
    throw new Error('Unable to find relevant verses at this time');
  }
};

export const generateExplanation = async (verse, userContext) => {
  try {
    const prompt = `
    Provide a detailed, compassionate explanation of this verse in the context of the user's situation:
    
    Verse: "${verse}"
    User's situation: "${userContext}"
    
    Please explain:
    1. The deeper meaning of this verse
    2. How it specifically applies to their situation
    3. Practical steps they can take
    4. Additional spiritual practices that might help
    
    Keep the response warm, encouraging, and respectful of all faith traditions.
    `;

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: "You are a wise spiritual counselor who provides deep, practical guidance while respecting all religious traditions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.6,
      max_tokens: 1000,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating explanation:', error);
    throw new Error('Unable to generate explanation at this time');
  }
};

export const compareAcrossScriptures = async (topic) => {
  try {
    const prompt = `
    Compare how different major scriptures (Bible, Quran, Bhagavad Gita, Buddhist texts) approach the topic of: "${topic}"

    Please provide a comparative analysis with:
    1. Key verses from each tradition
    2. Common themes and differences
    3. How each tradition's approach can complement the others
    4. Practical insights for someone interested in multiple perspectives

    Format as JSON with structure:
    {
      "topic": "${topic}",
      "scriptures": [
        {
          "name": "scripture name",
          "verse": "relevant verse",
          "reference": "source reference",
          "approach": "how this tradition approaches the topic"
        }
      ],
      "commonThemes": ["theme1", "theme2"],
      "practicalInsights": "guidance for integrating multiple perspectives"
    }
    `;

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: "You are an expert in comparative religion who helps people understand wisdom across different faith traditions with respect and accuracy."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const response = completion.choices[0].message.content;
    return JSON.parse(response);
  } catch (error) {
    console.error('Error comparing scriptures:', error);
    throw new Error('Unable to compare scriptures at this time');
  }
};