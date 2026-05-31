interface Step {
  question: string;
  field: string;
  optional?: boolean;
}

interface ChatState {
  currentStep: number;
  userData: Record<string, string>;
  initialService: string;
  messages: Array<{ text: string; type: 'user' | 'bot' }>;
  isOpen: boolean;
}

const steps: Step[] = [
  { question: 'Great! What is your name?', field: 'name' },
  { question: 'What is your phone number?', field: 'phone' },
  { question: 'What is your email address?', field: 'email' },
  { question: 'Anything else we should know about your project?', field: 'message', optional: true },
];

const STORAGE_KEY = 'oak-ridge-chat-state';

function saveState(state: ChatState) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState(): ChatState | null {
  const saved = sessionStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  }
  return null;
}

function clearState() {
  sessionStorage.removeItem(STORAGE_KEY);
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatServiceResponse(text: string): string {
  const serviceMap: Record<string, string> = {
    'new-roof': 'I need a new roof',
    'repair': 'I need a roof repair',
    'storm': 'I have storm damage',
    'inspection': 'I need a free inspection',
    'other': 'I have another question'
  };
  return serviceMap[text] || text;
}

export function initChat() {
  const widget = document.getElementById('chatWidget');
  const toggle = document.getElementById('chatToggle');
  const messagesContainer = document.getElementById('chatMessages');
  const options = document.getElementById('chatOptions');
  const form = document.getElementById('chatForm') as HTMLFormElement | null;
  const input = document.getElementById('chatInput') as HTMLInputElement | null;
  const success = document.getElementById('chatSuccess');

  let currentStep = 0;
  let userData: Record<string, string> = {};
  let initialService = '';

  // Load saved state
  const savedState = loadState();
  if (savedState) {
    currentStep = savedState.currentStep;
    userData = savedState.userData;
    initialService = savedState.initialService;

    // Restore messages
    if (messagesContainer && savedState.messages.length > 0) {
      messagesContainer.innerHTML = '';
      savedState.messages.forEach((msg) => {
        const msgEl = document.createElement('div');
        msgEl.className = `message ${msg.type}`;
        
        if (msg.type === 'bot') {
          msgEl.innerHTML = `
            <div class="message-avatar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div class="message-bubble bot-bubble">${escapeHtml(msg.text)}</div>
          `;
        } else {
          msgEl.innerHTML = `<div class="message-bubble user-bubble">${escapeHtml(msg.text)}</div>`;
        }
        
        messagesContainer.appendChild(msgEl);
      });
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Restore UI state
    if (savedState.currentStep > 0 || savedState.initialService) {
      if (options) options.style.display = 'none';
      if (form) form.style.display = 'flex';
    }
    
    if (savedState.currentStep >= steps.length) {
      if (form) form.style.display = 'none';
      if (success) success.style.display = 'flex';
    }

    // Keep chat open if it was open
    if (savedState.isOpen && widget) {
      widget.classList.add('open');
    }
  }

  function getMessages(): Array<{ text: string; type: 'user' | 'bot' }> {
    if (!messagesContainer) return [];
    const msgs: Array<{ text: string; type: 'user' | 'bot' }> = [];
    messagesContainer.querySelectorAll('.message').forEach((msg) => {
      const bubble = msg.querySelector('.message-bubble');
      if (bubble) {
        const isBot = msg.classList.contains('bot');
        msgs.push({ text: bubble.textContent || '', type: isBot ? 'bot' : 'user' });
      }
    });
    return msgs;
  }

  function save() {
    saveState({
      currentStep,
      userData,
      initialService,
      messages: getMessages(),
      isOpen: widget?.classList.contains('open') || false
    });
  }

  toggle?.addEventListener('click', () => {
    widget?.classList.toggle('open');
    save();
  });

  document.querySelectorAll('.chat-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      const response = btn.getAttribute('data-response');
      if (response) {
        addMessage(formatServiceResponse(response), 'user');
        handleInitialResponse(response);
        save();
      }
    });
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input) {
      const value = input.value.trim();
      if (value) {
        addMessage(value, 'user');
        handleResponse(value);
        input.value = '';
        save();
      }
    }
  });

  function addMessage(text: string, type: 'user' | 'bot') {
    if (!messagesContainer) return;
    
    const msg = document.createElement('div');
    msg.className = `message ${type}`;
    
    if (type === 'bot') {
      const bubble = document.createElement('div');
      bubble.className = 'message-bubble bot-bubble';
      bubble.textContent = text;
      
      const avatar = document.createElement('div');
      avatar.className = 'message-avatar';
      avatar.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`;
      
      msg.appendChild(avatar);
      msg.appendChild(bubble);
    } else {
      const bubble = document.createElement('div');
      bubble.className = 'message-bubble user-bubble';
      bubble.textContent = escapeHtml(text);
      msg.appendChild(bubble);
    }
    
    messagesContainer.appendChild(msg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function handleInitialResponse(response: string) {
    initialService = response;
    userData['service'] = response;
    
    if (options) options.style.display = 'none';
    if (form) form.style.display = 'flex';
    if (input) input.focus();
    
    setTimeout(() => {
      addMessage('Got it! Let me connect you with the right person. What is your name?', 'bot');
    }, 400);
  }

  function handleResponse(value: string) {
    const step = steps[currentStep];
    if (step) {
      userData[step.field] = value;
      currentStep++;
    }

    if (currentStep < steps.length) {
      const nextStep = steps[currentStep];
      setTimeout(() => {
        addMessage(nextStep.question, 'bot');
      }, 500);
    } else {
      if (form) form.style.display = 'none';
      setTimeout(() => {
        if (success) success.style.display = 'flex';
        addMessage("Perfect! We've received your information. One of our roofing specialists will reach out within 24 hours to discuss your project.", 'bot');
      }, 500);
    }
  }
}
