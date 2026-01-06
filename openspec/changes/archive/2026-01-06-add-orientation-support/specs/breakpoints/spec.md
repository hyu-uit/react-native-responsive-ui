## MODIFIED Requirements

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
