# Copilot Instructions for test-project

## Architecture Overview

**Full-Stack Application**: Spring Boot backend (Java 25, PostgreSQL) + Next.js frontend (React 19, TypeScript, SCSS)

- **Backend** (`/backend`): REST API with modular domain structure (users, foodentry, trip, auth)
- **Frontend** (`/frontend`): Next.js 16 with app router, component-based with SCSS styling

**Data Flow**: Frontend pages → Next.js components → Backend REST APIs → Spring Data JPA → PostgreSQL

## Key Files & Patterns

### Backend Architecture (Spring Boot 4.0.1)

**Entity Model** - Domain-driven structure:

- [User.java](backend/src/main/java/com/example/backend/users/User.java): `@Entity @Table` with JPA annotations, password stored as `passwordHash`
- [Trip.java](backend/src/main/java/com/example/backend/trip/Trip.java): Contains `LocalDate` fields and `@OneToOne` relationships
- [FoodEntry.java](backend/src/main/java/com/example/backend/foodentry/FoodEntry.java): Minimal entity (under development)

**Service Layer**:

- [UserService.java](backend/src/main/java/com/example/backend/users/UserService.java): Constructor injection of repositories, methods return entities or null
- Services use `@Service` annotation with dependency injection pattern

**Controller Pattern**:

- Controller classes (`*Controller.java`) coordinate HTTP endpoints with services
- Most controllers in early stages (FoodEntryController, TripController are empty/scaffolding)

**Configuration**:

- PostgreSQL driver at runtime scope
- Spring Data JPA for persistence
- Use SEQUENCE strategy for ID generation across entities

### Frontend Architecture (Next.js 16)

**Project Structure**:

- `/src/app`: Page-based routing (App Router), includes `layout.tsx` for root layout
- `/src/components`: Reusable components with co-located SCSS (e.g., `LoginForm/LoginForm.tsx` + `LoginForm.scss`)
- Pages: login, register, about (with dedicated SCSS files)

**Styling Convention**: SCSS modules co-located with components (e.g., `LoginForm.scss` alongside `LoginForm.tsx`)

**Package Manager**: pnpm (configured in workspace)

## Build & Development Commands

### Backend (Maven)

```bash
cd backend
./mvnw clean install        # Build with tests
./mvnw spring-boot:run      # Run locally
mvn test                    # Run tests only
```

### Frontend (pnpm)

```bash
cd frontend
pnpm dev                    # Start dev server on http://localhost:3000
pnpm build                  # Production build
pnpm lint                   # Run ESLint
pnpm sass                   # Compile SCSS (pre-installed)
```

## Project-Specific Conventions

- **JPA Configuration**: Use `@GeneratedValue(strategy = GenerationType.SEQUENCE)` for all entity IDs
- **Constructor Injection**: Prefer constructor injection in services over field injection
- **Protected No-arg Constructors**: JPA entities require `protected` default constructor (see User, Trip)
- **Component Imports**: Next.js Link component for in-app navigation (see LoginForm)
- **Naming**: Class names match files (PascalCase), repositories use `*Repository` suffix

## Integration Points

- **Backend Exposure**: Spring MVC on default port (typically 8080), REST endpoints under controller mappings
- **Frontend Calls**: Components make API calls to backend (implementation pending in most controllers)
- **CORS**: May need configuration if frontend runs on different port during development

## Common Workflows

**Adding New Entity**:

1. Create entity class in `/backend/src/main/java/com/example/backend/{domain}/` with JPA annotations
2. Create repository interface extending `JpaRepository<Entity, Long>`
3. Create service with `@Service` + constructor-injected repository
4. Create controller with endpoint mappings

**Adding Frontend Feature**:

1. Create component in `/src/components/{ComponentName}/` folder
2. Add `.tsx` file with component logic and co-located `.scss` for styles
3. Import component in appropriate page under `/src/app/`

## Testing Notes

- Backend tests: [BackendApplicationTests.java](backend/src/test/java/com/example/backend/BackendApplicationTests.java)
- Test scope: `spring-boot-starter-webmvc-test`
- Frontend: ESLint configured, pre-commit linting recommended

## Notes for AI Agents

- **Incomplete Code**: Trip, FoodEntry services/controllers are scaffolding—implement carefully with established patterns
- **Database**: PostgreSQL is required; Docker Compose available in `/backend/docker-compose.yml`
- **Dependencies**: Check `pom.xml` and `package.json` before adding new packages
- **API Design**: Assume RESTful conventions; no GraphQL or custom protocols in place
