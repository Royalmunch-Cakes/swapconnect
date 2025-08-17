# SwapConnect v2 Monorepo

This monorepo contains two Next.js applications:

- **frontend**: The main user-facing app
- **dashboard**: The admin dashboard

Both apps use **TypeScript** and **Tailwind CSS** for rapid development and styling. The monorepo is managed with [Turborepo](https://turbo.build/) for fast builds and [Husky](https://typicode.github.io/husky/) for Git hooks.

---

## 📦 Project Structure

```
swapconnect-v2/
│
├── frontend/   # Main app (Next.js + TypeScript + Tailwind)
├── dashboard/  # Admin dashboard (Next.js + TypeScript + Tailwind)
├── turbo.json  # Turborepo pipeline config
├── package.json
└── ...
```

---

## 🚀 Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/your-org/swapconnect-v2.git
cd swapconnect-v2
```

### 2. Install dependencies

This will install dependencies for the root and both apps:

```sh
npm install
```

### 3. Run the apps

You can run each app individually:

```sh
# In the root directory
cd frontend
npm run dev

# In another terminal
cd ../dashboard
npm run dev
```

Or use Turborepo to run both in parallel:

```sh
npx turbo run dev --parallel
```

### 4. Build all apps

```sh
npx turbo run build
```

---

## 🧑‍💻 Development

- Both apps use **TypeScript** and **Tailwind CSS**.
- Linting and formatting are enforced via **ESLint** and **Husky** pre-commit hooks.
- Shared configuration and scripts can be managed at the root.

---

## 🛠️ Useful Commands

| Command                | Description                       |
|------------------------|-----------------------------------|
| `npm run dev`          | Start development server          |
| `npm run build`        | Build the app for production      |
| `npm run lint`         | Run ESLint                        |
| `npx turbo run <task>` | Run a task across all packages    |

---

## 📝 Notes

- Make sure you have **Node.js** and **npm** installed.
- Husky will automatically set up Git hooks after `npm install`.
- For more details, see the individual READMEs in [`frontend`](frontend/README.md) and [`dashboard`](dashboard/README.md).

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Turborepo Documentation](https://turbo.build/docs)
- [Husky Documentation](https://typicode.github.io/husky/)
