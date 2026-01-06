# breakpoints Specification

## Purpose
TBD - created by archiving change add-breakpoints-responsive. Update Purpose after archive.
## Requirements
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

The system SHALL provide a `useDeviceType()` hook for accessing device type reactively in components.

#### Scenario: Access device type in component

- **GIVEN** a component using `useDeviceType()`
- **WHEN** the hook is called
- **THEN** it SHALL return the current device type based on screen width

#### Scenario: Device type updates on dimension change

- **GIVEN** a component using `useDeviceType()`
- **WHEN** the screen width changes (e.g., due to rotation) and crosses a breakpoint
- **THEN** the component SHALL re-render with the new device type

#### Scenario: Mobile device rotates to tablet width

- **GIVEN** a mobile phone with portrait width 375 (below tablet breakpoint 768)
- **AND** a component using `useDeviceType()` showing "mobile"
- **WHEN** the user rotates to landscape (width becomes 812)
- **THEN** the component SHALL re-render and show "tablet"

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

