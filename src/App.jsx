import { useState } from "react";
import SearchBar from "./SearchBar";
import ProfileCard from "./ProfileCard";
import "./App.css";
import RepoList from "./RepoList";

export default function App() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchUser(username) {
    setLoading(true);
    setError("");
    setProfile(null);
    setRepos([]);

    try {
      const [userRes, repoRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
      ]);

      if (userRes.status === 404) throw new Error("User not found. Check the username and try again.");
      if (userRes.status === 403) throw new Error("GitHub API rate limit reached. Try again in a few minutes.");
      if (!userRes.ok || !repoRes.ok) throw new Error("Something went wrong. Please try again.");

      setProfile(await userRes.json());
      setRepos(await repoRes.json());
    } catch (err) {
      setError(err instanceof TypeError ? "Network error. Check your connection." : err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app">
      <h1>GitHub Profile Analyzer</h1>
      <SearchBar onSearch={fetchUser} disabled={loading} />
      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">{error}</p>}
      {profile && <ProfileCard profile={profile} />}
      {profile && <RepoList repos={repos} />}
    </main>
  );
}