# scaling Specification

## Purpose
TBD - created by archiving change add-scaling-system. Update Purpose after archive.
## Requirements
### Requirement: Scale Function

The system SHALL provide an `s()` function that scales numeric values based on screen width relative to a configurable base width.

#### Scenario: Scale a padding value on a standard mobile device

- **GIVEN** a base width of 375 (default)
- **AND** the device screen width is 375
- **WHEN** `s(16)` is called
- **THEN** the result SHALL be `16`

#### Scenario: Scale a padding value on a larger device

- **GIVEN** a base width of 375
- **AND** the device screen width is 768 (tablet)
- **WHEN** `s(16)` is called
- **THEN** the result SHALL be approximately `32.77` (16 * 768 / 375)

#### Scenario: Scale a negative margin

- **GIVEN** a base width of 375
- **AND** the device screen width is 750
- **WHEN** `s(-8)` is called
- **THEN** the result SHALL be `-16`

#### Scenario: Scale zero value

- **WHEN** `s(0)` is called
- **THEN** the result SHALL be `0`

### Requirement: Scale Factor Utility

The system SHALL provide a `getScaleFactor()` function that returns the current scale multiplier for debugging and testing purposes.

#### Scenario: Get scale factor on matching device

- **GIVEN** a base width of 375
- **AND** the device screen width is 375
- **WHEN** `getScaleFactor()` is called
- **THEN** the result SHALL be `1`

#### Scenario: Get scale factor on larger device

- **GIVEN** a base width of 375
- **AND** the device screen width is 750
- **WHEN** `getScaleFactor()` is called
- **THEN** the result SHALL be `2`

### Requirement: Spacing Design Tokens

The system SHALL provide pre-defined spacing tokens (`space`) that use the scaling system.

#### Scenario: Use spacing tokens for consistent padding

- **GIVEN** spacing tokens are imported from the library
- **WHEN** `space.md` is used as a padding value
- **THEN** the value SHALL be a scaled 16pt based on screen width

#### Scenario: Spacing token scale (xs through xxl)

- **GIVEN** spacing tokens are available
- **THEN** the following tokens SHALL exist with base values:
  - `space.xs` = scaled 4
  - `space.sm` = scaled 8
  - `space.md` = scaled 16
  - `space.lg` = scaled 24
  - `space.xl` = scaled 32
  - `space.xxl` = scaled 48

### Requirement: Font Size Design Tokens

The system SHALL provide pre-defined font size tokens (`font`) that use the scaling system.

#### Scenario: Use font tokens for text sizing

- **GIVEN** font tokens are imported from the library
- **WHEN** `font.body` is used as a fontSize value
- **THEN** the value SHALL be a scaled 16pt based on screen width

#### Scenario: Font token scale

- **GIVEN** font tokens are available
- **THEN** the following tokens SHALL exist with base values:
  - `font.caption` = scaled 12
  - `font.body` = scaled 16
  - `font.subtitle` = scaled 18
  - `font.title` = scaled 24
  - `font.headline` = scaled 32

### Requirement: Border Radius Design Tokens

The system SHALL provide pre-defined border radius tokens (`radius`) that use the scaling system.

#### Scenario: Use radius tokens for rounded corners

- **GIVEN** radius tokens are imported from the library
- **WHEN** `radius.md` is used as a borderRadius value
- **THEN** the value SHALL be a scaled 8pt based on screen width

#### Scenario: Radius token scale

- **GIVEN** radius tokens are available
- **THEN** the following tokens SHALL exist with base values:
  - `radius.none` = 0 (not scaled)
  - `radius.sm` = scaled 4
  - `radius.md` = scaled 8
  - `radius.lg` = scaled 16
  - `radius.full` = 9999 (not scaled, for pill shapes)

### Requirement: Scaled StyleSheet Utility

The system SHALL provide a `createScaledStyle()` function that creates StyleSheet-compatible styles with all numeric values automatically scaled.

#### Scenario: Create scaled styles from style object

- **GIVEN** a style object `{ padding: 16, fontSize: 14, borderRadius: 8 }`
- **AND** the device screen width is 750 (2x scale factor)
- **WHEN** `createScaledStyle()` is called with this object
- **THEN** the result SHALL be `{ padding: 32, fontSize: 28, borderRadius: 16 }`

#### Scenario: Non-numeric values are preserved

- **GIVEN** a style object `{ flexDirection: 'row', padding: 16 }`
- **AND** the device screen width is 750 (2x scale factor)
- **WHEN** `createScaledStyle()` is called with this object
- **THEN** the result SHALL be `{ flexDirection: 'row', padding: 32 }`

