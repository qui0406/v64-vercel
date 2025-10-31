import { useEffect } from "react";

const AgentXChat = () => {
  useEffect(() => {
    if (document.getElementById("agentx-script")) return;

    window.AgentXConfig = {
      agentId: "88a980a7-bcec-424c-b519-cd535afca7f4"
    };

    const script = document.createElement("script");
    script.id = "agentx-script";
    script.src = "https://app.agent-x.cx/agent-x-live-chat.js?v=" + new Date().getTime();
    script.async = true;

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null; // không render gì ra UI
};

export default AgentXChat;
