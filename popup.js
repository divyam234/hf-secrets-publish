document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('secretsForm');
  const publishButton = document.getElementById('publishButton');
  const statusDiv = document.getElementById('status');
  const modelSpaceInput = document.getElementById('modelSpace');
  const envContentInput = document.getElementById('envContent');

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const url = tabs[0].url;
    const matches = url.match(/https:\/\/huggingface\.co\/spaces\/(.+?)\/settings/);
    if (matches && matches[1]) {
      modelSpaceInput.value = matches[1].replace('/', '/');
    } else {
      updateStatus('Please navigate to a Hugging Face space settings page.', 'error');
      publishButton.disabled = true;
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const envContent = envContentInput.value;
    const modelSpace = modelSpaceInput.value;

    if (!envContent || !modelSpace) {
      updateStatus('Please provide all required information.', 'error');
      return;
    }

    updateStatus('Publishing secrets...', '');
    publishButton.disabled = true;

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['inject.js']
      });

      const result = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: publishSecrets,
        args: [envContent, modelSpace]
      });
      
      if (result[0].result.success) {
        updateStatus('Secrets published successfully!', 'success');
      } else {
        throw new Error(result[0].result.error);
      }
    } catch (error) {
      console.error('Error publishing secrets:', error);
      updateStatus(`Error: ${error.message}`, 'error');
    } finally {
      publishButton.disabled = false;
    }
  });

  function updateStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = type;
  }
});

function publishSecrets(envContent, modelSpace) {
  return window.publishHuggingFaceSecrets(envContent, modelSpace);
}

function injectAndExecute(envContent, modelSpace) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('inject.js');
    (document.head || document.documentElement).appendChild(script);

    window.addEventListener('publishHuggingFaceSecretsReady', function() {
      window.publishHuggingFaceSecrets(envContent, modelSpace)
        .then(() => resolve({ success: true }))
        .catch(error => resolve({ success: false, error: error.message }));
    }, { once: true });
  });
}