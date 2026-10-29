html, body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  font-family: Inter, "Segoe UI", Arial, sans-serif;
  background: #07131f;
  color: #e2e8f0;
}

* {
  box-sizing: border-box;
}

button,
input,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

.dashboard-shell {
  min-height: 100vh;
  display: flex;
  background:
    radial-gradient(circle at top left, rgba(14, 165, 233, 0.18), transparent 28%),
    radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.12), transparent 22%),
    #07131f;
}

.sidebar {
  width: 280px;
  background: rgba(11, 20, 30, 0.96);
  border-right: 1px solid rgba(148, 163, 184, 0.14);
  padding: 28px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-mark {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0ea5e9, #2563eb);
  font-weight: 800;
  color: white;
}

.overline {
  margin: 0 0 4px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 10px;
  color: #7dd3fc;
}

h1,
h2,
h3,
p {
  margin: 0;
}

h2 {
  font-size: 1.4rem;
}

.nav-stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-item {
  border: 1px solid rgba(148, 163, 184, 0.12);
  background: rgba(15, 23, 42, 0.5);
  color: #dfe6ee;
  border-radius: 12px;
  text-align: left;
  padding: 12px 14px;
  transition: 0.2s ease;
}

.nav-item.active {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.18), rgba(37, 99, 235, 0.12));
  border-color: rgba(125, 211, 252, 0.32);
}

.status-panel {
  margin-top: auto;
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: 16px;
  padding: 16px;
  background: rgba(15, 23, 42, 0.6);
}

.status-label {
  display: block;
  color: #94a3b8;
  margin-bottom: 10px;
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.status-row {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #dfe6ee;
}

.pulse {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 10px rgba(52, 211, 153, 0.7);
}

.workspace-panel {
  flex: 1;
  padding: 28px 28px 32px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 22px;
}

h1 {
  font-size: clamp(2rem, 4vw, 2.8rem);
  color: #f8fafc;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ghost-button {
  background: rgba(15, 23, 42, 0.7);
  color: #dbeafe;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 12px;
  padding: 10px 14px;
}

.metric-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.metric-card {
  padding: 18px 20px;
  background: rgba(15, 23, 42, 0.76);
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: 18px;
}

.metric-card.accent {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(37, 99, 235, 0.12));
}

.metric-card span,
.metric-card small {
  display: block;
  color: #94a3b8;
}

.metric-card strong {
  display: block;
  color: white;
  margin: 10px 0 4px;
  font-size: 1.8rem;
}

.workspace-grid {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(300px, 420px);
  gap: 18px;
}

.chat-panel,
.settings-panel {
  background: rgba(15, 23, 42, 0.76);
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: 22px;
  padding: 18px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.eyebrow {
  margin-bottom: 5px;
  color: #7dd3fc;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.chat-window {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 560px;
  overflow: auto;
  padding-right: 8px;
}

.message {
  display: flex;
}

.message.user {
  justify-content: flex-end;
}

.message.assistant {
  justify-content: flex-start;
}

.bubble {
  max-width: min(760px, 100%);
  border-radius: 18px;
  padding: 16px 18px;
  background: rgba(15, 118, 110, 0.13);
  border: 1px solid rgba(94, 234, 212, 0.2);
}

.message.user .bubble {
  background: rgba(59, 130, 246, 0.12);
  border-color: rgba(96, 165, 250, 0.26);
}

.bubble p {
  margin: 0 0 12px;
  line-height: 1.6;
  color: #e2e8f0;
}

.keyword-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.keyword-pill {
  display: inline-flex;
  align-items: center;
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px solid rgba(147, 197, 253, 0.26);
  color: #bfdbfe;
  background: rgba(59, 130, 246, 0.1);
  font-size: 0.74rem;
}

.repo-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}

.repo-card {
  display: block;
  padding: 14px;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
}

.repo-topline {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: flex-start;
}

.repo-topline strong {
  display: block;
  margin-bottom: 8px;
  color: #f8fafc;
}

.meta-row {
  display: flex;
  gap: 10px;
  color: #94a3b8;
  font-size: 0.78rem;
}

.score-badge {
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(74, 222, 128, 0.4);
  color: #bbf7d0;
  padding: 6px 10px;
  font-size: 0.72rem;
}

.repo-card p {
  margin: 10px 0 8px;
  font-size: 0.85rem;
  color: #cbd5e1;
}

.repo-card small {
  color: #7dd3fc;
  line-height: 1.5;
}

.composer {
  margin-top: 18px;
  border-top: 1px solid rgba(148, 163, 184, 0.14);
  padding-top: 18px;
}

.composer textarea {
  width: 100%;
  min-height: 124px;
  resize: vertical;
  background: rgba(15, 23, 42, 0.72);
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 16px;
  padding: 16px 18px;
  color: #f8fafc;
}

.controls {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

button[type="submit"],
.settings-actions button:last-child {
  border: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, #2563eb, #0ea5e9);
  color: white;
  padding: 12px 18px;
  font-weight: 700;
}

.settings-panel {
  transition: 0.25s ease;
}

.settings-panel.closed {
  display: none;
}

.field-group {
  display: block;
  margin-bottom: 18px;
}

.field-group span {
  display: block;
  margin-bottom: 8px;
  color: #cbd5e1;
  font-size: 0.82rem;
}

.field-group input {
  width: 100%;
  background: rgba(15, 23, 42, 0.72);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 12px;
  padding: 12px 14px;
  color: #f8fafc;
}

.segmented-control {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.segment {
  background: rgba(15, 23, 42, 0.76);
  border: 1px solid rgba(148, 163, 184, 0.18);
  color: #dfe6ee;
  border-radius: 12px;
  padding: 10px 8px;
}

.segment.active {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.14), rgba(37, 99, 235, 0.18));
  border-color: rgba(125, 211, 252, 0.32);
}

.settings-actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 18px;
}

@media (max-width: 980px) {
  .dashboard-shell {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    border-right: 0;
    border-bottom: 1px solid rgba(148, 163, 184, 0.14);
  }

  .workspace-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .workspace-panel {
    padding: 18px 16px 24px;
  }

  .metric-row {
    grid-template-columns: 1fr;
  }

  .topbar {
    align-items: flex-start;
    flex-direction: column;
  }
}

