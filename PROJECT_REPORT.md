# E-Commerce DevOps Project Report

## 1. Project Overview
This project is a modern e-commerce web application built with Next.js, TypeScript, and Tailwind CSS, featuring a beautiful dark glassy UI. It is fully containerized and monitored, with a complete CI/CD pipeline using Jenkins, Docker, and Ansible.

**[Photo: Screenshot of the homepage showing the dark glassy UI with product grid and cart]**

---

## 2. Features
- **Modern UI**: Dark mode, glassmorphism, purple/blue gradients, smooth animations, and responsive design.
- **Product Catalog**: Multiple categories (Electronics, Sports, Home) with 12+ products.
- **Shopping Cart**: Add/remove products, see totals, and checkout.
- **Search Bar**: Quickly find products (UI only).
- **Professional Header**: Navigation, search, cart, and user menu.

**[Photo: Screenshot of the product grid with several products visible]**
**[Photo: Screenshot of the cart sidebar with items added]**

---

## 3. DevOps Pipeline
- **Jenkins**: Automates build, test, Docker image creation, and deployment.
- **Docker**: Containerizes the app, Grafana, and Graphite for monitoring.
- **Ansible**: Handles deployment to servers.
- **Testing**: Jest for frontend, JUnit for backend (if used).
- **Security**: npm audit and Trivy scans.

**[Photo: Screenshot of Jenkins pipeline with all stages green]**
**[Photo: Screenshot of Jenkins build log showing test and deploy steps]**

---

## 4. Monitoring & Observability
- **Grafana**: Visualizes app metrics (response time, errors, usage, etc.).
- **Graphite**: Collects and stores metrics.
- **Pre-built Dashboard**: Ready-to-use dashboard for e-commerce monitoring.

**[Photo: Screenshot of Grafana dashboard with e-commerce panels visible]**
**[Photo: Screenshot of Graphite web interface]**

---

## 5. How the Pipeline Works
1. **Code Commit**: Developer pushes code to Git.
2. **Jenkins Trigger**: Pipeline starts automatically.
3. **Build & Test**: Installs dependencies, runs lint/type checks, and tests.
4. **Docker Build**: Creates a production image.
5. **Security Scan**: Checks for vulnerabilities.
6. **Push to Registry**: Uploads image to Docker registry.
7. **Deploy**: Ansible deploys the new version to the server.
8. **Health Check**: Jenkins verifies the deployment.
9. **Monitoring**: Metrics are sent to Graphite and visualized in Grafana.

**[Photo: Diagram of the CI/CD pipeline flow from code commit to deployment and monitoring]**

---

## 6. User Experience
- **Homepage**: Hero section, animated title, and product grid.
- **Product Cards**: Glassy, animated, with category badges and premium tags.
- **Cart**: Glassy sidebar, animated, with subtotal, tax, and checkout.
- **Responsive**: Works on desktop and mobile.

**[Photo: Screenshot of the homepage on a mobile device]**
**[Photo: Screenshot of a product card with hover effect]**

---

## 7. How to Run the Project
1. **Local Development**:
   - `npm install`
   - `npm run dev`
   - Visit http://localhost:3000
2. **With Docker Compose**:
   - `sudo docker compose up -d`
   - App: http://localhost:3000
   - Grafana: http://localhost:3002 (admin/admin)
   - Graphite: http://localhost:8080
3. **Run Tests**:
   - `npm test`
   - `npm run test:coverage`

**[Photo: Terminal screenshot showing npm run dev and the app starting]**
**[Photo: Terminal screenshot showing docker compose up with all containers running]**

---

## 8. Key Files & Structure
- `src/app/` - Main app code
- `src/components/` - UI components
- `src/types/` - TypeScript types
- `Dockerfile`, `docker-compose.yml` - Container setup
- `Jenkinsfile` - CI/CD pipeline
- `ansible/` - Deployment scripts
- `monitoring/grafana/` - Dashboard config

**[Photo: Screenshot of the project folder structure in a file explorer or terminal]**

---

## 9. Summary
This project demonstrates a full-stack, production-ready e-commerce platform with:
- Modern UI/UX
- Automated CI/CD
- Containerization
- Monitoring & observability
- Professional code quality and security

**[Photo: Team or developer at their workstation, or a celebratory "Deployed!" message on the dashboard]** 