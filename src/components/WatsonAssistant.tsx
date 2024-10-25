import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    watsonAssistantChatOptions: any;
  }
}

const WatsonAssistant: React.FC = () => {
  const instanceRef = useRef<any>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    const loadWatsonAssistant = () => {
      if (!window.watsonAssistantChatOptions) {
        window.watsonAssistantChatOptions = {
          integrationID: "470f997b-7122-45aa-b4d9-f6068ad86db8",
          region: "au-syd",
          serviceInstanceID: "24f1b7e2-df1b-4180-8230-180b23979402",
          onLoad: async (instance: any) => {
            instanceRef.current = instance;
            await instance.render();
            instance.openWindow();
          }
        };

        if (!scriptRef.current) {
          const t = document.createElement('script');
          t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
          document.head.appendChild(t);
          scriptRef.current = t;
        }
      } else if (instanceRef.current) {
        instanceRef.current.openWindow();
      }
    };

    loadWatsonAssistant();

    // Adiciona um ouvinte de evento para reabrir a janela quando ela for fechada
    const handleWindowClose = () => {
      if (instanceRef.current) {
        instanceRef.current.openWindow();
      }
    };

    window.addEventListener('watsonAssistantChatWindowClosed', handleWindowClose);

    return () => {
      window.removeEventListener('watsonAssistantChatWindowClosed', handleWindowClose);
      if (instanceRef.current) {
        instanceRef.current.destroySession();
      }
      if (scriptRef.current) {
        document.head.removeChild(scriptRef.current);
      }
    };
  }, []);

  return null;
};

export default WatsonAssistant;
