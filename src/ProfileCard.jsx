export default function ProfileCard({ profile }) {
  return (
    <section className="profile">
      <img src={profile.avatar_url} alt={`${profile.login}'s avatar`} />
      <div>
        <h2>{profile.name || profile.login}</h2>
        <p className="handle">@{profile.login}</p>
        <p>{profile.bio || "No bio provided."}</p>
        <ul className="stats">
          <li><strong>{profile.followers}</strong> followers</li>
          <li><strong>{profile.following}</strong> following</li>
          <li><strong>{profile.public_repos}</strong> repos</li>
        </ul>
      </div>
    </section>
  );
}