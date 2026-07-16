import { useState, type ReactNode, type FormEvent } from "react";

const STORAGE_KEY = "fhg_authed";
const CORRECT_PASSWORD = import.meta.env.VITE_GENOME_PASSWORD || "MillyBird123!";

export default function PasswordGate({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(STORAGE_KEY) === "true");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  if (authed) return <>{children}</>;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setAuthed(true);
    } else {
      setError(true);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#FAF7F2", padding: 24 }}>
      <img src="/images/FH_mark_official.png" alt="FoundHer Genome" style={{ width: 80, marginBottom: 32 }} />
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: "100%", maxWidth: 320 }}>
        <input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(false); }}
          placeholder="Enter password"
          style={{ width: "100%", padding: "12px 16px", fontSize: 16, fontFamily: "'DM Sans', sans-serif", border: "1px solid rgba(59,42,34,0.2)", borderRadius: 4, background: "#FFFFFF", color: "#3B2A22", outline: "none", boxSizing: "border-box" }}
        />
        <button type="submit" style={{ width: "100%", padding: "12px 16px", fontSize: 16, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", border: "none", borderRadius: 4, background: "#C1603A", color: "#FAF7F2", cursor: "pointer" }}>
          Submit
        </button>
        {error && <p style={{ color: "#C1603A", fontSize: 14, fontFamily: "'DM Sans', sans-serif", margin: 0 }}>Incorrect password</p>}
      </form>
    </div>
  );
}
