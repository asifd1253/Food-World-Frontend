import React from "react";

class AboutClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repositories: [],
      commits: [],
      isLoading: true,
      error: null,
    };

    this.githubUsername = "asifd1253";
    this.timer = null;
  }

  componentDidMount() {
    this.fetchGitHubData();

    // Refresh every 5 minutes
    this.timer = setInterval(
      () => {
        this.fetchGitHubData();
      },
      5 * 60 * 1000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  async fetchGitHubData() {
    try {
      const [repositoriesResponse] = await Promise.all([
        fetch(
          `https://api.github.com/users/${this.githubUsername}/repos?per_page=100&sort=updated`,
        ),
      ]);

      if (!repositoriesResponse.ok) {
        throw new Error("Unable to fetch repositories");
      }

      const repositories = await repositoriesResponse.json();

      this.setState({
        repositories,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("GitHub API error:", error);

      this.setState({
        isLoading: false,
        error: error.message,
      });
    }
  }

  getLanguageColor(language) {
    const colors = {
      JavaScript: "bg-yellow-400",
      Java: "bg-orange-500",
      Python: "bg-blue-500",
      HTML: "bg-orange-600",
      CSS: "bg-blue-600",
      React: "bg-cyan-500",
      TypeScript: "bg-blue-500",
    };

    return colors[language] || "bg-slate-400";
  }

  render() {
    const { userInfo } = this.props;
    const { repositories, isLoading, error } = this.state;

    const publicRepositories = repositories.filter((repo) => !repo.fork);

    return (
      <div className="space-y-8">
        {/* Profile Card */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="h-32 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900" />

          <div className="-mt-16 px-6 pb-6 sm:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <img
                  src={userInfo.avatar_url}
                  alt={userInfo.name}
                  className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
                />

                <div className="pb-1">
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    {userInfo.name || userInfo.login}
                  </h2>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    @{userInfo.login}
                  </p>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                    {userInfo.bio ||
                      "Full Stack Developer building projects and learning every day."}
                  </p>
                </div>
              </div>

              <a
                href={`https://github.com/${this.githubUsername}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-700"
              >
                View GitHub
              </a>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Repositories
                </p>
                <p className="mt-2 text-2xl font-extrabold text-slate-900">
                  {userInfo.public_repos}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Followers
                </p>
                <p className="mt-2 text-2xl font-extrabold text-slate-900">
                  {userInfo.followers}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Following
                </p>
                <p className="mt-2 text-2xl font-extrabold text-slate-900">
                  {userInfo.following}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Public Work
                </p>
                <p className="mt-2 text-2xl font-extrabold text-slate-900">
                  {publicRepositories.length}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Progress */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Learning Progress
            </p>

            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              What I am working on
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              My current development journey across frontend, backend and
              problem solving.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <ProgressCard
              title="React"
              description="React, hooks, routing, class components and UI development."
              progress="75%"
            />

            <ProgressCard
              title="Node.js"
              description="Express, MongoDB, authentication, middleware and APIs."
              progress="70%"
            />

            <ProgressCard
              title="Java"
              description="Core Java, collections, JDBC and advanced Java concepts."
              progress="70%"
            />

            <ProgressCard
              title="DSA"
              description="LeetCode and GeeksForGeeks problem solving practice."
              progress="65%"
            />
          </div>
        </section>

        {/* GitHub Repositories */}
        <section>
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                GitHub
              </p>

              <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
                My Repositories
              </h2>
            </div>

            <span className="text-sm font-medium text-slate-500">
              {publicRepositories.length} public repositories
            </span>
          </div>

          {isLoading && (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-52 animate-pulse rounded-2xl bg-slate-200"
                />
              ))}
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-700">
              <p className="font-bold">Unable to load GitHub repositories.</p>

              <p className="mt-1 text-sm">{error}</p>
            </div>
          )}

          {!isLoading && !error && (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {publicRepositories.map((repo) => (
                <RepositoryCard
                  key={repo.id}
                  repo={repo}
                  getLanguageColor={this.getLanguageColor}
                />
              ))}
            </div>
          )}
        </section>

        {/* Current Focus */}
        <section className="rounded-3xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Current Focus
          </p>

          <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
            Building, learning and improving every day.
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            Currently working on React development, full-stack applications,
            Node.js backend development, Java, authentication and consistent DSA
            practice.
          </p>
        </section>
      </div>
    );
  }
}

const ProgressCard = ({ title, description, progress }) => {
  return (
    <div className="rounded-2xl border border-slate-200 p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900">{title}</h3>

        <span className="text-sm font-bold text-blue-600">{progress}</span>
      </div>

      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-blue-600"
          style={{ width: progress }}
        />
      </div>
    </div>
  );
};

const RepositoryCard = ({ repo, getLanguageColor }) => {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Repository
          </p>

          <h3 className="mt-1 break-words text-lg font-extrabold text-slate-900">
            {repo.name}
          </h3>
        </div>

        <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
          Public
        </span>
      </div>

      <p className="mt-4 flex-1 text-sm leading-6 text-slate-500">
        {repo.description || "No description available."}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {repo.language && (
          <span className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span
              className={`h-3 w-3 rounded-full ${getLanguageColor(
                repo.language,
              )}`}
            />

            {repo.language}
          </span>
        )}

        <span className="text-xs font-semibold text-slate-400">
          ★ {repo.stargazers_count}
        </span>

        <span className="text-xs font-semibold text-slate-400">
          Forks {repo.forks_count}
        </span>
      </div>

      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white"
      >
        View Repository
      </a>
    </article>
  );
};

export default AboutClass;
