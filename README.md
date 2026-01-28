# 🌍 Wanderlust — Full-Stack Property Rental Platform

🔗 Live Demo: https://wanderlust-2-ggwl.onrender.com/listing

## Executive Summary

Wanderlust is a production-oriented, full-stack property rental platform inspired by Airbnb.  
It is designed to demonstrate secure authentication, ownership-based authorization, scalable CRUD workflows, and clean MVC architecture aligned with real-world backend engineering standards.

## Why This Project Exists

Most academic projects focus only on basic functionality.  
Wanderlust was intentionally built to reflect real-world backend expectations, including authorization control, scalable application structure, and production-style data modeling.

The objective was to move beyond tutorials and design a system with clear architectural structure and maintainable backend workflows.

## Core Features

### User Capabilities
- Secure user registration and login (session-based authentication)
- Browse property listings with detailed views
- View pricing, images, and reviews
- Submit ratings and feedback

### Host Capabilities
- Create, update, and delete property listings
- Upload and manage property images
- Ownership-based access control for listing modifications

### Security & Reliability
- Authentication using Passport.js
- Authorization middleware for protected routes
- Input validation and centralized error handling
- Session management with Express

## Technology Stack

**Frontend**
- EJS
- HTML5
- CSS3
- Bootstrap

**Backend**
- Node.js
- Express.js (MVC architecture)

**Database**
- MongoDB
- Mongoose ODM

**Authentication & Security**
- Passport.js
- passport-local-mongoose
- express-session

**Cloud & Deployment**
- Cloudinary (image storage)
- MongoDB Atlas
- <Hosting render>

## Engineering Highlights

- Implemented RESTful APIs following industry-standard conventions
- Enforced ownership-based authorization at the middleware level
- Designed clean and normalized Mongoose schemas
- Centralized asynchronous error handling to improve reliability
- Structured the codebase using MVC principles for maintainability
- Integrated cloud-based image storage for scalable asset management

## Project Structure

/models        → Mongoose schemas  
/controllers  → Business logic  
/routes        → Application routes  
/middleware   → Authentication & validation  
/views         → EJS templates  
/public        → Static assets  

## Professional Takeaway

This project demonstrates my ability to design and implement secure, scalable, backend-driven full-stack applications with a strong focus on clean architecture, authorization, and maintainability.
