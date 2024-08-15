window.publishHuggingFaceSecrets = async function(envContent, modelSpace) {
  function parseEnvContent(content) {
    const secrets = {};
    const lines = content.split('\n');
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const equalSignIndex = trimmedLine.indexOf('=');
        if (equalSignIndex !== -1) {
          const key = trimmedLine.slice(0, equalSignIndex).trim();
          const value = trimmedLine.slice(equalSignIndex + 1).trim();
          if (key && value) {
            secrets[key] = value;
          }
        }
      }
    }
    
    return secrets;
  }

  async function setHuggingFaceSecret(modelSpace, key, value) {
    const url = `https://huggingface.co/api/spaces/${modelSpace}/secrets`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key, value }),
      credentials: 'include'
    });
  
    if (!response.ok) {
      throw new Error(`Failed to set secret ${key}: ${response.statusText}`);
    }
  }

  try {
    const secrets = parseEnvContent(envContent);
    
    for (const [key, value] of Object.entries(secrets)) {
      await setHuggingFaceSecret(modelSpace, key, value);
    }
    return { success: true };
  } catch (error) {
    console.error('Error in publishHuggingFaceSecrets:', error);
    return { success: false, error: error.message };
  }
};