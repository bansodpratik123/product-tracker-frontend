# 🛍️ Get Best Deal Frontend

A modern, responsive React application for tracking product prices and getting notified when they drop to your target price. Built with Vite, React, Tailwind CSS, and featuring a beautiful dark theme with glass-morphism effects.

![Get Best Deal](https://img.shields.io/badge/Get%20Best%20Deal-AI%20Powered-teal)
![React](https://img.shields.io/badge/React-19+-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1+-cyan)
![Vite](https://img.shields.io/badge/Vite-7.2+-yellow)

## ✨ Features

### 🎨 **Modern UI/UX**
- **Dark Theme** with glass-morphism effects
- **Fully Responsive** design (mobile, tablet, desktop)
- **Smooth Animations** and transitions
- **Professional gradients** and visual effects
- **Toast notifications** for user feedback

### 🛒 **Product Tracking**
- **Add Products** by pasting URLs from e-commerce sites
- **Set Target Prices** and get notified when reached
- **Real-time Status Updates** with actionable badges
- **CRUD Operations** - Create, Read, Update, Delete products
- **Price History** and trend indicators

### 📱 **Responsive Design**
- **Mobile-first** approach
- **Horizontal navigation** with hamburger menu on mobile
- **Sequential horizontal layout** for products with large images (192×144px)
- **Touch-friendly** interactions and responsive grid system

### 🔧 **Developer Experience**
- **Hot Module Replacement** for instant updates
- **TypeScript-ready** architecture
- **Component-based** structure
- **Clean separation** of concerns

## 🏗️ Project Structure

```
src/
├── api/                    # API layer and backend communication
│   └── api.js             # Axios instance and API functions
├── components/            # Reusable UI components
│   ├── Header.jsx         # Navigation header with mobile menu
│   ├── ProductCard.jsx    # Individual product display card
│   ├── StatusBadge.jsx    # Product status indicator
│   ├── AddProductModal.jsx # Add new product form modal
│   ├── EditTargetModal.jsx # Edit target price modal
│   ├── ConfirmModal.jsx   # Delete confirmation modal
│   ├── Toast.jsx          # Notification toast component
│   ├── LoadingSkeleton.jsx # Loading state placeholder
│   └── EmptyState.jsx     # Empty products state
├── pages/                 # Page-level components
│   ├── Landing.jsx        # Homepage with hero, features, stats
│   └── ProductsPage.jsx   # Product management dashboard
├── utils/                 # Utility functions
│   ├── format.js          # Currency and date formatting
│   └── productMapper.js   # Backend-to-frontend data mapping
├── App.jsx               # Main app component with routing
├── main.jsx              # Application entry point
└── index.css             # Global styles and Tailwind config
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Backend server** running on port 8001

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd get-best-deal-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   ```env
   VITE_API_BASE=http://localhost:8001
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:5174
   ```

## 🔌 Backend Integration

### API Endpoints

The frontend expects these backend endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/products` | Fetch all tracked products |
| `POST` | `/add-product` | Add a new product to track |
| `PATCH` | `/update-product/:id` | Update product target price |
| `DELETE` | `/delete-product/:id` | Delete a tracked product |

### Backend Data Format

Your backend should return products in this format:

```json
{
  "product_id": "abc123",
  "user_id": "pratik",
  "product_name": "Nike Total 90 Premium",
  "status": "WAIT_FOR_DROP",
  "current_price": "11895.00",
  "target_price": "12000.00",
  "url": "https://www.nike.com/...",
  "created_at": "2024-12-15T10:30:00Z"
}
```

### Status Values

| Backend Status | Frontend Display | Description |
|----------------|------------------|-------------|
| `PENDING_FIRST_CHECK` | Tracking will start soon | Initial state before first price check |
| `WAIT_FOR_DROP` | Waiting for price drop | Monitoring price, waiting for decrease |
| `READY_TO_BUY` | Price dropped 🎉 | Target price reached, ready to purchase |
| `ERROR` | Tracking failed | Issue with tracking this product |

### Data Mapping

The frontend automatically maps backend data to frontend format using `productMapper.js`:

```javascript
// Backend → Frontend
{
  product_id → id
  product_name → title
  current_price (string) → current_price (number)
  target_price (string) → target_price (number)
  status → status (preserved as-is)
}
```

## 🎨 Design System

### Color Palette

```css
--color-teal-400: #2dd4bf;    /* Primary accent */
--color-teal-500: #14b8a6;    /* Primary accent dark */
--color-cyan-400: #22d3ee;    /* Secondary accent */
--color-cyan-500: #06b6d4;    /* Secondary accent dark */
--color-slate-300: #cbd5e1;   /* Text secondary */
--color-slate-400: #94a3b8;   /* Text muted */
--color-slate-700: #334155;   /* Border */
--color-slate-800: #1e293b;   /* Card background */
--color-slate-900: #0f172a;   /* Background dark */
--color-slate-950: #020617;   /* Background darkest */
```

### Typography Scale

```css
/* Hero Heading */
text-5xl md:text-6xl lg:text-7xl font-bold

/* Section Heading */
text-4xl md:text-5xl font-bold

/* Card Title */
text-xl font-semibold

/* Body Text */
text-lg leading-relaxed
```

### Spacing System

```css
/* Section Padding */
py-20, py-24, py-32

/* Card Padding */
p-6, p-8

/* Grid Gaps */
gap-6, gap-8

/* Content Max Width */
max-w-7xl mx-auto px-6
```

## 📱 Responsive Breakpoints

| Screen Size | Layout | Product Display |
|-------------|--------|-----------------|
| **Mobile** (`<640px`) | Sequential vertical stack, hamburger navigation | Full width horizontal cards |
| **Tablet** (`640px-1024px`) | Sequential vertical stack, full navigation | Full width horizontal cards |
| **Desktop** (`>1024px`) | Sequential vertical stack, full navigation | Full width horizontal cards |

## 🧩 Component API

### ProductCard

```jsx
<ProductCard
  product={productObject}
  onEdit={(product) => {}}
  onDelete={(product) => {}}
  onViewUrl={(url) => {}}
/>
```

### StatusBadge

```jsx
<StatusBadge status="PENDING_FIRST_CHECK" />
<StatusBadge status="WAIT_FOR_DROP" />
<StatusBadge status="READY_TO_BUY" />
<StatusBadge status="ERROR" />
```

### Toast

```jsx
<Toast
  message="Product added successfully"
  type="success" // 'success' | 'error'
  isVisible={true}
  onClose={() => {}}
  duration={5000}
/>
```

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 🔧 Configuration

### Tailwind CSS v4

The project uses Tailwind CSS v4 with a custom theme configuration in `src/index.css`:

```css
@import "tailwindcss";

@theme {
  --color-teal-400: #2dd4bf;
  /* ... other custom colors */

  --animate-fade-in: fade-in 0.5s ease-in-out;

  @keyframes fade-in {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
}
```

### Vite Configuration

Hot module replacement is enabled for all React components and CSS files.

### PostCSS Configuration

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

## 🌟 Key Features Explained

### 1. **Product Status System**
- Backend-authoritative status management without frontend price inference
- Four distinct states: PENDING_FIRST_CHECK, WAIT_FOR_DROP, READY_TO_BUY, ERROR
- Actionable status messages that tell users exactly what to do
- Color-coded badges for quick visual identification
- Proper null price handling with "—" display for missing current prices

### 2. **Responsive Navigation**
- Fixed header with horizontal navigation on desktop
- Collapsible hamburger menu on mobile devices
- Smooth animations and transitions

### 3. **Modal Management**
- Add Product Modal with form validation
- Edit Target Price Modal with current product context
- Delete Confirmation Modal with product details

### 4. **Loading States**
- Skeleton components for better perceived performance
- Loading indicators for all async operations
- Empty states with encouraging call-to-action

### 5. **Error Handling**
- Toast notifications for user feedback
- Form validation with inline error messages
- Graceful API error handling

## 🚀 Production Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized assets.

### Environment Variables

For production, ensure these environment variables are set:

```env
VITE_API_BASE=https://your-production-api.com
```

### Static File Serving

The built files can be served by any static file server:

- **Netlify**: Connect your repository and deploy automatically
- **Vercel**: Import your project and deploy with zero configuration
- **Nginx**: Serve the `dist/` folder as static files
- **Apache**: Configure document root to `dist/` folder

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## 📝 Development Guidelines

### Code Style
- Use functional components with hooks
- Follow the existing file and folder structure
- Use descriptive component and variable names
- Add comments for complex logic

### State Management
- Use React's built-in useState and useEffect hooks
- Keep component state local when possible
- Pass data down through props
- Use context for global state when needed

### API Integration
- All API calls go through the `api.js` module
- Use the product mapper for data transformation
- Handle errors gracefully with user feedback
- Implement loading states for all async operations

## 🐛 Troubleshooting

### Common Issues

**1. Development server won't start**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**2. Tailwind styles not loading**
```bash
# Check PostCSS configuration
# Ensure @tailwindcss/postcss is installed
npm install -D @tailwindcss/postcss
```

**3. API requests failing**
```bash
# Check backend server is running on port 8001
# Verify CORS is enabled in backend
# Check .env file has correct API URL
```

**4. Build fails**
```bash
# Check for TypeScript errors
# Ensure all imports are correct
# Verify environment variables are set
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Vite** - For the blazing fast build tool
- **Lucide React** - For the beautiful icon set

---

**Happy Deal Hunting! 🎯**

Made with ❤️ by the Get Best Deal Team