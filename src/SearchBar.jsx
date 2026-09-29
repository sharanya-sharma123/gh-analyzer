import { useState } from "react";

export default function SearchBar({ onSearch, disabled }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const name = value.trim();
    if (name) onSearch(name);
  }

  return (
    <form onSubmit={handleSubmit} className="search">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter a GitHub username"
      />
      <button disabled={disabled}>Search</button>
    </form>
  );
}