# orientation Specification

## Purpose
TBD - created by archiving change add-orientation-support. Update Purpose after archive.
## Requirements
### Requirement: Orientation Detection

The system SHALL detect the current device orientation based on screen dimensions.

#### Scenario: Portrait orientation detection

- **GIVEN** a device with screen width 375 and height 812
- **WHEN** `getOrientation()` or `useOrientation()` is called
- **THEN** it SHALL return `"portrait"`

#### Scenario: Landscape orientation detection

- **GIVEN** a device with screen width 812 and height 375
- **WHEN** `getOrientation()` or `useOrientation()` is called
- **THEN** it SHALL return `"landscape"`

#### Scenario: Square screen defaults to portrait

- **GIVEN** a device with screen width 500 and height 500
- **WHEN** `getOrientation()` or `useOrientation()` is called
- **THEN** it SHALL return `"portrait"`

### Requirement: Real-time Dimension Updates

The system SHALL update components when device dimensions change (e.g., rotation).

#### Scenario: Device rotates from portrait to landscape

- **GIVEN** a component using `useOrientation()`
- **AND** the device is in portrait mode
- **WHEN** the user rotates the device to landscape
- **THEN** the component SHALL re-render with `"landscape"`

#### Scenario: Scale factor updates on rotation

- **GIVEN** a component using `useResponsiveConfig()`
- **AND** the device is in portrait mode with width 375
- **WHEN** the user rotates to landscape (width becomes 812)
- **THEN** the component SHALL re-render with updated scaleFactor and screenWidth

#### Scenario: Device type updates on rotation

- **GIVEN** a mobile device (portrait width 375) using `useDeviceType()`
- **WHEN** the user rotates to landscape (width becomes 812, exceeds tablet breakpoint 768)
- **THEN** the component SHALL re-render with device type `"tablet"`

### Requirement: Orientation Hook

The system SHALL provide a `useOrientation()` hook for accessing orientation reactively.

#### Scenario: Access orientation in component

- **GIVEN** a component within the app
- **WHEN** `useOrientation()` is called
- **THEN** it SHALL return the current orientation (`"portrait"` or `"landscape"`)

#### Scenario: Orientation updates trigger re-render

- **GIVEN** a component using `useOrientation()`
- **WHEN** the device orientation changes
- **THEN** the component SHALL re-render with the new orientation value

