import React from "react";
import AboutClass from "../../components/AboutClass";

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        login: "asifd1253",
        name: "Dunnapothula Asif",
        avatar_url: "https://avatars.githubusercontent.com/u/140490107?v=4",
        bio: "Full Stack Developer | Java | React | Node.js | MongoDB",
        public_repos: 0,
        followers: 0,
        following: 0,
      },
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch("https://api.github.com/users/asifd1253");

      if (!response.ok) {
        throw new Error("Failed to fetch GitHub profile");
      }

      const json = await response.json();

      this.setState({
        userInfo: json,
      });
    } catch (error) {
      console.error("GitHub profile error:", error);
    }
  }

  render() {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Developer Profile
            </p>

            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              About Me
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              A live overview of my GitHub profile, repositories, learning
              progress and development activity.
            </p>
          </div>

          <AboutClass userInfo={this.state.userInfo} />
        </div>
      </main>
    );
  }
}

export default About;
