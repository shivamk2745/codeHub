import "./Ai.scss";
const Ai = () => {
  return (
    <>
      <div className="input">
        <div className="ai-container">
          <div className="ai-header-wrapper">
            <h2 className="ai-header">Chat with AI</h2>
            <p className="subtitle">Pick any one of the chat modes</p>
          </div>
          <div className="chat-modes">
            <div className="mode-card">
              <div className="icon">🔍</div>
              <p>Find Mistake</p>
            </div>
            <div className="mode-card">
              <div className="icon">💡</div>
              <p>Give Hints</p>
            </div>
            <div className="mode-card">
              <div className="icon">💬</div>
              <p>Discussion</p>
            </div>
          </div>
          <div className="examples">
            <p className="description">
              Our AI already has knowledge about the problem and your solution.
              You can start asking questions right away.
            </p>
            <p className="example">Examples:</p>
            <p>What are the pre-requisites to solve the problem?</p>
            <p>Provide me hints to solve the problem?</p>
            <p>Help me debug my code</p>
            <p>Help me understand the problem</p>
            <p>Help me understand the solution</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Ai;
