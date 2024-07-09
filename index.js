
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  const { GoogleAIFileManager } = require("@google/generative-ai/server");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const fileManager = new GoogleAIFileManager(apiKey);
  
  /**
   * Uploads the given file to Gemini.
   *
   * See https://ai.google.dev/gemini-api/docs/prompting_with_media
   */
  async function uploadToGemini(path, mimeType) {
    const uploadResult = await fileManager.uploadFile(path, {
      mimeType,
      displayName: path,
    });
    const file = uploadResult.file;
    console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
    return file;
  }
  
  /**
   * Waits for the given files to be active.
   *
   * Some files uploaded to the Gemini API need to be processed before they can
   * be used as prompt inputs. The status can be seen by querying the file's
   * "state" field.
   *
   * This implementation uses a simple blocking polling loop. Production code
   * should probably employ a more sophisticated approach.
   */
  async function waitForFilesActive(files) {
    console.log("Waiting for file processing...");
    for (const name of files.map((file) => file.name)) {
      let file = await fileManager.getFile(name);
      while (file.state === "PROCESSING") {
        process.stdout.write(".")
        await new Promise((resolve) => setTimeout(resolve, 10_000));
        file = await fileManager.getFile(name)
      }
      if (file.state !== "ACTIVE") {
        throw Error(`File ${file.name} failed to process`);
      }
    }
    console.log("...all files ready\n");
  }
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run() {
    // TODO Make these files available on the local file system
    // You may need to update the file paths
    const files = [
      await uploadToGemini("resume.pdf", "application/pdf"),
    ];
  
    // Some files have a processing delay. Wait for them to be ready.
    await waitForFilesActive(files);
  
    const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {
              fileData: {
                mimeType: files[0].mimeType,
                fileUri: files[0].uri,
              },
            },
            {text: "Give  5 HR question in json format with answers by uploading their resume\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"question\": \"Tell me about a time you faced a technical challenge while working on a project. How did you approach it and what was the outcome?\",\n    \"answer\": \"During my internship at Hygwell, I encountered a challenge while implementing the frontend for a headless Shopify store using React and Hydrogen. The store's load times were significantly slower than expected, affecting user experience. I approached the problem by first profiling the application to identify performance bottlenecks. It turned out the issue was with excessive data fetching and inefficient component rendering. I optimized the data fetching strategy by using lazy loading and code splitting. I also refactored the components to improve rendering efficiency. These changes resulted in a 40% reduction in load times, significantly improving user experience.\"\n  },\n  {\n    \"question\": \"What are your strengths and weaknesses as a developer?\",\n    \"answer\": \"My strengths as a developer include my strong understanding of fundamental programming concepts and my ability to quickly learn and adapt to new technologies. I'm also a collaborative team player and enjoy working with others to solve complex problems.  One weakness I'm actively working on is my proficiency in back-end development.  While I have a good grasp of the fundamentals, I'm eager to expand my knowledge in areas like backend frameworks and databases.\"\n  },\n  {\n    \"question\": \"Why are you interested in this role?\",\n    \"answer\": \"I'm deeply passionate about developing innovative and user-friendly web applications.  I believe this role aligns perfectly with my skills and aspirations. I'm particularly excited by the opportunity to contribute to [Mention specific details about the company or role that excites you].  My background in frontend development, along with my experience in React, Shopify, and other relevant technologies, makes me confident I can make a valuable contribution to your team.\" \n  },\n  {\n    \"question\": \"Describe your experience working on the 'Mock Interview with AI' project. What did you learn from it?\",\n    \"answer\": \"The Mock Interview with AI project was a valuable learning experience. Developing a full-stack application from scratch, incorporating AI functionality with Gemini API and WebGazer.js, taught me the importance of planning, collaboration, and efficient code implementation. I gained practical experience in backend development using FastAPI and front-end development using React. This project also helped me to understand the potential of AI in enhancing user experiences and providing personalized feedback.\"\n  },\n  {\n    \"question\": \"What are your future career goals?\",\n    \"answer\": \"My long-term goal is to become a highly skilled and versatile full-stack developer, contributing to impactful projects in the tech industry.  I'm interested in pursuing opportunities that involve working on complex projects, collaborating with talented teams, and staying at the forefront of technological advancements.\"\n  }\n]\n``` \n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    console.log(result.response.text());
  }
  
  run();