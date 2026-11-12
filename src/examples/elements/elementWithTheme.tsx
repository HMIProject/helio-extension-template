import {
  ButtonGroup,
  Checkbox,
  createElement,
  createPropsSchema,
  Dropdown,
  RadioGroup,
  Switch,
  traits,
  useDesignTokens,
} from '@hmiproject/helio-sdk';
import { useState } from 'react';
import { namespace } from '../../namespace';

// NOTE: This is example code. To activate, add it to the list of elements in
// the library extension definition in `src/main.tsx`.
//
// This example shows how an element blends into any HELIO theme:
//
// - The element's controls are HELIO's own components. They follow the active
//   theme by themselves.
// - The level bar below draws its own content. It takes every color and size
//   from the theme's design tokens through `useDesignTokens`.
export const elementWithTheme = createElement(namespace, {
  name: 'Element with Theme',
  description: 'An element that blends into the active HELIO theme',

  // The trait wraps the component in a standard HELIO container, which
  // already adapts to the theme.
  //
  // `withConfig` turns parts of that container on or off. Turning one off
  // removes both the part and its prop in the editor. All parts are on by
  // default.
  traits: [
    traits.Widget.withConfig({
      hasLabel: true,
      hasIcon: true,
      hasDescription: true,
      hasAction: false,
    }),
  ],

  propsSchema: createPropsSchema().initial({}),

  Component() {
    // The settings only live in the element's state, so that the components
    // have something to change.
    const [level, setLevel] = useState(50);
    const [status, setStatus] = useState<Status>('good');
    const [size, setSize] = useState<Size>('small');
    const [showValue, setShowValue] = useState(true);
    const [showStatus, setShowStatus] = useState(true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        {/* Plain HTML text inherits the text color and font family from the
            container. Everything else, such as the size and margins of a
            heading, is left to the browser's defaults. */}
        <h3>Element with theme</h3>

        <LevelBar
          level={level}
          status={status}
          size={size}
          showValue={showValue}
          showStatus={showStatus}
        />

        <Dropdown options={levelOptions} value={level} onValueChange={setLevel} ariaLabel="Level" />

        {/* The value type has to be given explicitly here, TypeScript cannot
            infer it for a button group. */}
        <ButtonGroup<Status>
          type="single"
          options={statusOptions}
          value={status}
          onValueChange={setStatus}
          ariaLabel="Status"
        />

        <RadioGroup
          options={sizeOptions}
          value={size}
          onValueChange={setSize}
          orientation="horizontal"
          ariaLabel="Size"
        />

        {/* The switch has no label of its own. */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
          <Switch checked={showValue} onCheckedChange={setShowValue} ariaLabel="Show value" />
          Show value
        </div>

        <Checkbox checked={showStatus} onCheckedChange={setShowStatus} label="Show status" />
      </div>
    );
  },
});

type Status = 'good' | 'critical';
type Size = 'small' | 'large';

const levelOptions = [0, 25, 50, 75, 100].map((level) => ({ value: level, label: `${level} %` }));

const statusLabels: Record<Status, string> = {
  good: 'Good',
  critical: 'Critical',
};

const statusOptions: Array<{ value: Status; label: string }> = [
  { value: 'good', label: statusLabels.good },
  { value: 'critical', label: statusLabels.critical },
];

const sizeOptions: Array<{ value: Size; label: string }> = [
  { value: 'small', label: 'Small' },
  { value: 'large', label: 'Large' },
];

type LevelBarProps = {
  level: number;
  status: Status;
  size: Size;
  showValue: boolean;
  showStatus: boolean;
};

function LevelBar(props: LevelBarProps) {
  const tokens = useDesignTokens();

  // The level bar is set off slightly from the background it stands on. Its
  // text has the strongest contrast to that background.
  const backgroundColors = {
    background: tokens.blendNeutralPositiveFaint,
    text: tokens.blendNeutralPositiveFull,
  };

  // The status badge and the bar show the status. Each status color comes with
  // a text color that provides readable contrast.
  const statusColors =
    props.status === 'good'
      ? { background: tokens.signalingGoodBackground, text: tokens.signalingGoodText }
      : { background: tokens.signalingCriticalBackground, text: tokens.signalingCriticalText };

  // The bar derives its text style from container headers.
  const typography =
    props.size === 'small'
      ? {
          fontSize: tokens.containerLevel2HeaderFontSize,
          lineHeight: tokens.containerLevel2HeaderLineHeight,
          fontWeight: tokens.containerLevel2FontWeight,
        }
      : {
          fontSize: tokens.containerLevel1HeaderFontSize,
          lineHeight: tokens.containerLevel1HeaderLineHeight,
          fontWeight: tokens.containerLevel1FontWeight,
        };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5em',
        padding: '1em',
        background: backgroundColors.background,
        color: backgroundColors.text,
        fontSize: typography.fontSize,
        lineHeight: typography.lineHeight,
        fontWeight: typography.fontWeight,
      }}
    >
      <div
        // Caption
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <span>Level {props.showValue ? `${props.level} %` : null}</span>

        {props.showStatus ? (
          <span
            style={{
              padding: '0 0.5em',
              background: statusColors.background,
              color: statusColors.text,
            }}
          >
            {statusLabels[props.status]}
          </span>
        ) : null}
      </div>

      <div
        // Bar
        style={{
          width: `${props.level}%`,
          height: '1em',
          background: statusColors.background,
        }}
      />
    </div>
  );
}
