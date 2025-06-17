# Web Security Scanner Application

## Overview

This is a full-stack web application for security vulnerability scanning. It's built as a modern single-page application with a React frontend and an Express backend, designed to scan websites for various security vulnerabilities including XSS, SQL injection, and directory traversal attacks. The application features real-time scan monitoring, AI-powered payload generation, and comprehensive vulnerability reporting.

## System Architecture

The application follows a traditional client-server architecture with clear separation of concerns:

- **Frontend**: React with TypeScript, using Vite for build tooling
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Real-time Communication**: Server-Sent Events (SSE) for live scan updates
- **External Services**: OpenAI integration for AI-powered payload generation

The codebase is organized into three main directories:
- `client/` - React frontend application
- `server/` - Express backend API
- `shared/` - Common types and database schema

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Radix UI primitives with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom security-themed color palette
- **Real-time Updates**: EventSource API for receiving SSE updates

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Security Scanning**: Custom scanner service using Puppeteer for web crawling
- **AI Integration**: OpenAI GPT-4o for intelligent payload generation
- **Real-time Communication**: Server-Sent Events for live scan status updates

### Database Schema
The application uses four main tables:
- `users` - User authentication (basic username/password)
- `scans` - Scan configuration and status tracking
- `vulnerabilities` - Individual vulnerability findings
- `scan_results` - Aggregated scan results with metadata

### Security Scanning Engine
- **Web Crawler**: Puppeteer-based endpoint discovery
- **Vulnerability Detection**: Custom detection logic for XSS, SQLi, and directory traversal
- **AI-Powered Payloads**: OpenAI integration for generating sophisticated test payloads
- **Rate Limiting**: Configurable request throttling to avoid overwhelming target servers

## Data Flow

1. **Scan Initiation**: User configures scan parameters through the frontend form
2. **Scan Processing**: Backend validates parameters and starts asynchronous scan
3. **Real-time Updates**: Server broadcasts scan progress via SSE to all connected clients
4. **Vulnerability Detection**: Scanner tests discovered endpoints with various payloads
5. **Results Storage**: Findings are stored in PostgreSQL and made available via API
6. **Export Functionality**: Completed scans can be exported in multiple formats

## External Dependencies

### Core Framework Dependencies
- React ecosystem (React, React DOM, TanStack Query)
- Express.js with TypeScript support
- Drizzle ORM with PostgreSQL driver (@neondatabase/serverless)

### UI and Styling
- Radix UI component primitives
- Tailwind CSS for styling
- Lucide React for icons

### Security Scanning
- Puppeteer for web automation
- OpenAI SDK for AI payload generation
- Node-fetch for HTTP requests

### Development Tools
- Vite for frontend build tooling
- TypeScript for type safety
- ESBuild for server bundling

## Deployment Strategy

The application is configured for deployment on Replit with:
- **Development Mode**: `npm run dev` starts both frontend and backend in development
- **Production Build**: `npm run build` creates optimized frontend and backend bundles
- **Production Start**: `npm run start` runs the production server
- **Database Management**: `npm run db:push` syncs database schema

### Environment Configuration
- PostgreSQL database connection via `DATABASE_URL`
- OpenAI API key for AI payload generation
- Port configuration (default: 5000)

### Replit-Specific Features
- Auto-scaling deployment target
- Integrated PostgreSQL module
- Development runtime error overlays
- Cartographer integration for enhanced debugging

## Changelog

Changelog:
- June 17, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.