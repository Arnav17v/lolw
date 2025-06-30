# 🛒 E-Commerce DevOps Pipeline

A complete **Next.js e-commerce website** with a full **DevOps pipeline** that automatically builds, tests, and deploys the application.

## 🎯 What is this?

This is a **shopping website** (like Amazon or eBay) that includes:

- **Shopping cart** - Add/remove products
- **Product catalog** - Browse items
- **Modern design** - Clean, responsive interface
- **Automatic deployment** - Code changes automatically go live
- **Monitoring** - Track website performance
- **Testing** - Ensures everything works before going live

## 🚀 How to Run the Project

### Option 1: Quick Start (Recommended)
```bash
# 1. Install dependencies
npm install

# 2. Start the website
npm run dev

# 3. Open your browser
# Go to: http://localhost:3000
```

### Option 2: Run with Docker (Includes Monitoring)
```bash
# 1. Start everything (website + monitoring tools)
docker-compose up --build

# 2. Open your browser to:
# Website: http://localhost:3000
# Monitoring Dashboard: http://localhost:3002 (admin/admin)
```

## 📱 What You'll See

### The Website (http://localhost:3000)
- **Header** with navigation and shopping cart icon
- **Product grid** showing items like:
  - Wireless Headphones ($99.99)
  - Smart Watch ($199.99)
  - Running Shoes ($79.99)
- **Shopping cart** on the right side
- **Add to Cart** buttons on each product

### Features You Can Test
1. **Add products** to your cart
2. **Remove products** from your cart
3. **See total price** update automatically
4. **Responsive design** - works on mobile and desktop

### Monitoring Dashboard (http://localhost:3002)
- **Username**: admin
- **Password**: admin
- **Shows**: Website performance, errors, and usage statistics

## 🧪 Run Tests
```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage
```

## 🔧 What's Included

### Frontend
- **Next.js 14** - Modern React framework
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Beautiful styling
- **Shopping cart functionality**

### DevOps Tools
- **Docker** - Containerization
- **Jenkins** - Automated deployment pipeline
- **Ansible** - Server configuration
- **Grafana** - Performance monitoring
- **Graphite** - Data collection

### Testing
- **Jest** - JavaScript testing
- **React Testing Library** - Component testing
- **JUnit** - Java backend testing (if needed)

## 📊 Expected Results

### ✅ Success Indicators
- Website loads at http://localhost:3000
- You can see products and add them to cart
- Shopping cart updates when you add/remove items
- No error messages in the browser console
- Tests pass when you run `npm test`

### 🚨 If Something Goes Wrong
- **Port 3000 in use**: Stop other services or change the port
- **Dependencies missing**: Run `npm install` again
- **Docker issues**: Make sure Docker is running
- **Build errors**: Check the terminal for error messages

## 🎯 Quick Commands Reference

| What you want to do | Command | Result |
|---------------------|---------|---------|
| Start development | `npm run dev` | Website at localhost:3000 |
| Run with Docker | `docker-compose up` | Website + monitoring |
| Run tests | `npm test` | See test results |
| Build for production | `npm run build` | Create optimized version |
| Check health | Visit `/api/health` | See if app is running |

## 🔄 Development Workflow

1. **Make changes** to the code
2. **Save the file** - website automatically updates
3. **Test your changes** - run `npm test`
4. **Commit and push** - triggers automatic deployment (if Jenkins is set up)

## 📁 Project Structure

```
project/
├── src/                    # Website code
│   ├── app/               # Main pages
│   ├── components/        # Reusable parts
│   └── types/            # Type definitions
├── Dockerfile            # Container setup
├── docker-compose.yml    # Local development
├── Jenkinsfile          # Deployment pipeline
└── README.md            # This file
```

## 🆘 Need Help?

- **Website not loading**: Check if port 3000 is free
- **Docker issues**: Make sure Docker is installed and running
- **Tests failing**: Check the error messages in terminal
- **Deployment issues**: Check the Jenkins pipeline logs

## 🎉 You're Ready!

Start with `npm run dev` and visit http://localhost:3000 to see your e-commerce website in action!

---

**This project demonstrates modern web development with automated deployment - perfect for learning DevOps practices!**
