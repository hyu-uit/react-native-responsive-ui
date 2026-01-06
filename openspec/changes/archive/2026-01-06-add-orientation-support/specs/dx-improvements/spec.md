## MODIFIED Requirements

### Requirement: Responsive Config Hook

The system SHALL provide a `useResponsiveConfig()` hook for accessing the current configuration in components.

#### Scenario: Access config values in component

- **GIVEN** a component within ResponsiveProvider
- **WHEN** `useResponsiveConfig()` is called
- **THEN** it SHALL return the current baseWidth, breakpoints, screen dimensions, and orientation

#### Scenario: Config updates on dimension change

- **GIVEN** a component using `useResponsiveConfig()`
- **WHEN** the device dimensions change (e.g., rotation)
- **THEN** the component SHALL re-render with updated screenWidth, scaleFactor, and orientation

### Requirement: Responsive Provider

The system SHALL provide a `ResponsiveProvider` component for declarative configuration via React context.

#### Scenario: Configure base width via provider

- **GIVEN** an app wrapped in `<ResponsiveProvider baseWidth={414}>`
- **WHEN** scaling functions are used within the provider
- **THEN** they SHALL use 414 as the base width

#### Scenario: Configure breakpoints via provider

- **GIVEN** an app wrapped in `<ResponsiveProvider breakpoints={{ tablet: 600 }}>`
- **WHEN** `useDeviceType()` is called within the provider
- **THEN** it SHALL use 600 as the tablet breakpoint

#### Scenario: Provider is optional

- **GIVEN** an app without ResponsiveProvider
- **WHEN** scaling functions are used
- **THEN** they SHALL use default values (baseWidth: 375, tablet: 768, desktop: 1024)

#### Scenario: Provider responds to dimension changes

- **GIVEN** an app wrapped in `ResponsiveProvider`
- **WHEN** the device rotates or resizes
- **THEN** all consumers of the context SHALL re-render with updated dimensions
