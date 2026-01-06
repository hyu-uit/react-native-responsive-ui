## ADDED Requirements

### Requirement: Device Type Detection

The system SHALL provide a `getDeviceType()` function that returns the current device type based on screen width and configured breakpoints.

#### Scenario: Mobile device detection

- **GIVEN** default breakpoints (tablet: 768, desktop: 1024)
- **AND** the device screen width is 375
- **WHEN** `getDeviceType()` is called
- **THEN** the result SHALL be `"mobile"`

#### Scenario: Tablet device detection

- **GIVEN** default breakpoints (tablet: 768, desktop: 1024)
- **AND** the device screen width is 768
- **WHEN** `getDeviceType()` is called
- **THEN** the result SHALL be `"tablet"`

#### Scenario: Desktop device detection

- **GIVEN** default breakpoints (tablet: 768, desktop: 1024)
- **AND** the device screen width is 1024
- **WHEN** `getDeviceType()` is called
- **THEN** the result SHALL be `"desktop"`

#### Scenario: Custom breakpoint configuration

- **GIVEN** configured breakpoints (tablet: 600, desktop: 900)
- **AND** the device screen width is 650
- **WHEN** `getDeviceType()` is called
- **THEN** the result SHALL be `"tablet"`

### Requirement: Device Type Hook

The system SHALL provide a `useDeviceType()` React hook that returns the current device type for use in components.

#### Scenario: Use hook in component

- **GIVEN** a React component using `useDeviceType()`
- **AND** the device screen width is 800
- **WHEN** the component renders
- **THEN** `useDeviceType()` SHALL return `"tablet"`

### Requirement: Responsive Value Helper

The system SHALL provide a `responsive()` function that selects a value based on the current device type.

#### Scenario: Select value for current device type

- **GIVEN** a call to `responsive({ mobile: 1, tablet: 2, desktop: 3 })`
- **AND** the device type is `"tablet"`
- **WHEN** the function executes
- **THEN** the result SHALL be `2`

#### Scenario: Mobile-first fallback for missing breakpoint

- **GIVEN** a call to `responsive({ mobile: 1, tablet: 2 })`
- **AND** the device type is `"desktop"`
- **WHEN** the function executes
- **THEN** the result SHALL be `2` (falls back to tablet value)

#### Scenario: Fallback to mobile when only mobile specified

- **GIVEN** a call to `responsive({ mobile: 'column' })`
- **AND** the device type is `"desktop"`
- **WHEN** the function executes
- **THEN** the result SHALL be `'column'`

#### Scenario: Support non-numeric values

- **GIVEN** a call to `responsive({ mobile: 'column', tablet: 'row' })`
- **AND** the device type is `"tablet"`
- **WHEN** the function executes
- **THEN** the result SHALL be `'row'`

#### Scenario: Support boolean values

- **GIVEN** a call to `responsive({ mobile: false, tablet: true })`
- **AND** the device type is `"tablet"`
- **WHEN** the function executes
- **THEN** the result SHALL be `true`

### Requirement: Breakpoint Configuration

The system SHALL allow customizing breakpoint thresholds via the `configure()` function.

#### Scenario: Configure custom breakpoints

- **GIVEN** a call to `configure({ breakpoints: { tablet: 600, desktop: 900 } })`
- **WHEN** device type detection runs on a 650px screen
- **THEN** `getDeviceType()` SHALL return `"tablet"`

#### Scenario: Partial breakpoint configuration

- **GIVEN** a call to `configure({ breakpoints: { tablet: 600 } })`
- **WHEN** device type detection runs
- **THEN** tablet threshold SHALL be 600 AND desktop threshold SHALL remain 1024 (default)
