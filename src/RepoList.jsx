
import { useMemo, useState } from "react";

export default function RepoList({ repos }) {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("All");

  const languages = useMemo(
    () => ["All", ...new Set(repos.map((r) => r.language).filter(Boolean))],
    [repos]
  );

  const filtered = useMemo(
    () =>
      repos.filter(
        (r) =>
          r.name.toLowerCase().includes(query.toLowerCase()) &&
          (language === "All" || r.language === language)
      ),
    [repos, query, language]
  );

  if (repos.length === 0) return <p className="status">No public repositories.</p>;

  return (
    <section>
      <h3>Repositories ({filtered.length})</h3>

      <div className="filters">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search repositories"
        />
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          {languages.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="status">No repositories match your filters.</p>
      ) : (
        <div className="repo-grid">
          {filtered.map((repo) => (
            <a key={repo.id} className="repo" href={repo.html_url} target="_blank" rel="noreferrer">
              <h4>{repo.name}</h4>
              <p>{repo.description || "No description."}</p>
              <div className="meta">
                <span>⭐ {repo.stargazers_count}</span>
                <span>{repo.language || "Unknown"}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
