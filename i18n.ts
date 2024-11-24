export const translation = {
  asCount: "{{count, number}}",
  asDate: "{{date, datetime}}",
  site: {
    title: "dbsky",
    description: "Open-source public analytics for any Bluesky accounts",
    madeBy: "Made by <0>@phuctm97</0>",
  },
  hero: {
    title: "Open-source analytics for any <0>Bluesky</0> account",
    highlights:
      "<0>See public analytics of any Bluesky account</0><0>Contribute to add features you need</0><0>Self-host your own instance</0>",
  },
  colorScheme: {
    light: "Light",
    dark: "Dark",
    auto: "Auto",
  },
  error: {
    title: "Error",
    message: "Something went wrong.",
    close: "Close",
  },
  notFound: {
    title: "404",
    message: "The page you are looking for does not exist or has been moved.",
  },
  github: "Github",
  metric_one: "metric",
  metric_other: "metrics",
  follower_one: "follower",
  follower_other: "followers",
  follow_one: "follow",
  follow_other: "follows",
  post_one: "post",
  post_other: "posts",
} as const;

export const profile = {
  handle: "user.profile",
  name: "User Profile",
  newFollowers: "New followers",
  totalFollowers: "Total followers",
  followers: "Followers",
  follows: "Follows",
  posts: "Posts",
} as const;
