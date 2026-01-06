# dx-improvements Specification

## Purpose
TBD - created by archiving change add-dx-improvements. Update Purpose after archive.
## Requirements
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

### Requirement: Responsive Config Hook

The system SHALL provide a `useResponsiveConfig()` hook for accessing the current configuration in components.

#### Scenario: Access config values in component

- **GIVEN** a component within ResponsiveProvider
- **WHEN** `useResponsiveConfig()` is called
- **THEN** it SHALL return the current baseWidth, breakpoints, and screen dimensions

### Requirement: Auto-Scaled Styles

The system SHALL provide a `createScaledStyles()` function that automatically scales all numeric values in style objects.

#### Scenario: Scale numeric values in style object

- **GIVEN** a style object `{ padding: 16, fontSize: 14 }`
- **WHEN** `createScaledStyles()` is called
- **THEN** all numeric values SHALL be scaled using the `s()` function

#### Scenario: Preserve non-numeric values

- **GIVEN** a style object `{ flexDirection: 'row', padding: 16 }`
- **WHEN** `createScaledStyles()` is called
- **THEN** string values SHALL be preserved as-is

#### Scenario: Exclude ratio properties from scaling

- **GIVEN** a style object `{ flex: 1, opacity: 0.5, padding: 16 }`
- **WHEN** `createScaledStyles()` is called
- **THEN** `flex` and `opacity` SHALL NOT be scaled, but `padding` SHALL be scaled

#### Scenario: Handle nested style objects

- **GIVEN** a style object with nested objects `{ shadowOffset: { width: 2, height: 4 } }`
- **WHEN** `createScaledStyles()` is called
- **THEN** numeric values in nested objects SHALL be scaled

#### Scenario: Return StyleSheet-compatible styles

- **GIVEN** a style object passed to `createScaledStyles()`
- **WHEN** the function returns
- **THEN** the result SHALL be usable with React Native's style prop

