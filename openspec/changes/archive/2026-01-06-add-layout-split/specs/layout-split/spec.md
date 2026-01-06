## ADDED Requirements

### Requirement: Responsive Component HOC

The system SHALL provide a `responsiveComponent()` higher-order function that returns a component which renders different implementations based on device type.

#### Scenario: Render mobile component on mobile device

- **GIVEN** a responsive component created with `responsiveComponent({ mobile: MobileView, tablet: TabletView })`
- **AND** the device type is `"mobile"`
- **WHEN** the component is rendered
- **THEN** the `MobileView` component SHALL be rendered

#### Scenario: Render tablet component on tablet device

- **GIVEN** a responsive component created with `responsiveComponent({ mobile: MobileView, tablet: TabletView })`
- **AND** the device type is `"tablet"`
- **WHEN** the component is rendered
- **THEN** the `TabletView` component SHALL be rendered

#### Scenario: Fallback to mobile when tablet not specified

- **GIVEN** a responsive component created with `responsiveComponent({ mobile: MobileView })`
- **AND** the device type is `"tablet"`
- **WHEN** the component is rendered
- **THEN** the `MobileView` component SHALL be rendered (fallback)

#### Scenario: Props are forwarded to selected component

- **GIVEN** a responsive component with props interface `{ title: string }`
- **AND** the component is rendered with `<Component title="Hello" />`
- **WHEN** the device-specific component receives props
- **THEN** it SHALL receive `{ title: "Hello" }`

### Requirement: Responsive Switch Component

The system SHALL provide a `ResponsiveSwitch` component for declarative layout splitting in JSX.

#### Scenario: Render mobile content on mobile device

- **GIVEN** a `ResponsiveSwitch` with `mobile={<MobileContent />}` and `tablet={<TabletContent />}`
- **AND** the device type is `"mobile"`
- **WHEN** the component is rendered
- **THEN** the `MobileContent` element SHALL be rendered

#### Scenario: Render tablet content on tablet device

- **GIVEN** a `ResponsiveSwitch` with `mobile={<MobileContent />}` and `tablet={<TabletContent />}`
- **AND** the device type is `"tablet"`
- **WHEN** the component is rendered
- **THEN** the `TabletContent` element SHALL be rendered

#### Scenario: Fallback to mobile content when tablet not provided

- **GIVEN** a `ResponsiveSwitch` with only `mobile={<MobileContent />}`
- **AND** the device type is `"desktop"`
- **WHEN** the component is rendered
- **THEN** the `MobileContent` element SHALL be rendered (fallback)

#### Scenario: Desktop-specific content

- **GIVEN** a `ResponsiveSwitch` with `mobile`, `tablet`, and `desktop` props
- **AND** the device type is `"desktop"`
- **WHEN** the component is rendered
- **THEN** the `desktop` element SHALL be rendered
