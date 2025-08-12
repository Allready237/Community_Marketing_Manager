# AllReady Community Marketing Manager

A modern web application to help community managers quickly generate and send marketing posts to WhatsApp groups. Built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **Product Post Generator**: Enter product name, price, and upload an image to generate marketing captions in French and English.
- **AI-Powered Captions**: Instantly generate engaging captions for your products (simulated in this version).
- **Edit & Review**: Review and edit generated captions before sending.
- **WhatsApp Group Posting**: Simulate sending posts to WhatsApp groups.
- **Responsive UI**: Clean, modern, and mobile-friendly interface.

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for fast development
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for icons

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd Community_Marketing_Manager
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
Community_Marketing_Manager/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── components/
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── ProductForm.tsx
│       ├── ImageUpload.tsx
│       └── NotificationToast.tsx
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
└── ...
```

## Customization

- Update the `ProductForm` component to connect to real AI or WhatsApp APIs as needed.
- Modify styles in `index.css` or Tailwind config for branding.

## License

This project is licensed under the MIT License.
