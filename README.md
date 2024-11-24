# dbsky

Open-source analytics for any Bluesky account

![Screenshot](doc/screenshot-dark.png#gh-dark-mode-only)
![Screenshot](doc/screenshot-light.png#gh-light-mode-only)

## Tech stack

- Next.js 15, React 19, PostCSS: web framework

- Mantine: UI components

- Tabler: icons

- Jotai: state management

- i18next: internationalization

This project currently uses Next.js data cache as the primary data store. All fetches are cached for one day. There is no database (yet).

## Roadmap

- [ ] See social graph
- [x] See follower activity
- [ ] See follow activity
- [ ] See post activity
- [ ] See like activity
- [ ] See quote activity
- [ ] See repost activity

## Installation

1. Clone the repository

   ```bash
   # Git HTTPS
   git clone https://github.com/phuctm97/dbsky.git
   ```

   ```bash
   # Github CLI
   gh repo clone phuctm97/dbsky
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Build the project

   ```bash
   npm run build
   ```

4. Run the project

   ```bash
   npm start
   ```

5. Open `localhost:56078/profile/<handle>` ([example](http://localhost:56078/profile/phuctm97.com))

## Trying it out

You can open [dbsky.vercel.app](https://dbsky.vercel.app/profile/phuctm97.com) to try it out quickly. However, it's a free Vercel deployment, so its availability and performance are limited.

## Contributing

Feel free to submit issues and PRs

## Author

[@phuctm97](https://bsky.app/profile/phuctm97.com)

## License

MIT
