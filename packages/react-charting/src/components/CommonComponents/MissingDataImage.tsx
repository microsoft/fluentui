/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { ITheme } from '@fluentui/react/lib/Styling';
import * as React from 'react';
interface IMissingDataImageProps {
  theme?: ITheme;
  width: number;
  height: number;
}
class MissingDataImage extends React.Component<IMissingDataImageProps, {}> {
  constructor(props: IMissingDataImageProps) {
    super(props);
  }

  render() {
    const height = this.props.width * 0.8;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        {this.props.theme! && !this.props.theme!.isInverted ? (
          <svg
            width={this.props.width}
            height={height}
            viewBox="0 0 512 513"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="163" y="184.5" width="289" height="207" rx="20" fill="url(#paint0_linear_3061_1044)" />
            <rect
              x="163"
              y="184.5"
              width="289"
              height="207"
              rx="20"
              fill="url(#paint1_radial_3061_1044)"
              fillOpacity="0.4"
            />
            <rect
              x="163"
              y="184.5"
              width="289"
              height="207"
              rx="20"
              fill="url(#paint2_radial_3061_1044)"
              fillOpacity="0.4"
            />
            <rect
              x="163"
              y="184.5"
              width="289"
              height="207"
              rx="20"
              fill="url(#paint3_radial_3061_1044)"
              fillOpacity="0.4"
            />
            <rect
              x="163"
              y="184.5"
              width="289"
              height="207"
              rx="20"
              fill="url(#paint4_radial_3061_1044)"
              fillOpacity="0.5"
            />
            <rect
              x="163"
              y="184.5"
              width="289"
              height="207"
              rx="20"
              fill="url(#paint5_radial_3061_1044)"
              fillOpacity="0.6"
            />
            <circle cx="413.399" cy="182.51" r="26.8141" fill="url(#paint6_linear_3061_1044)" />
            <circle cx="167.5" cy="186" r="103.5" fill="url(#paint7_radial_3061_1044)" />
            <circle cx="167.5" cy="186" r="103.5" fill="url(#paint8_radial_3061_1044)" fillOpacity="0.3" />
            <circle cx="167.5" cy="186" r="103.5" fill="url(#paint9_radial_3061_1044)" fillOpacity="0.3" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M167.5 289.5C224.661 289.5 271 243.161 271 186C271 185.499 270.996 184.999 270.989 184.5L183 184.5C171.954 184.5 163 193.454 163 204.5V289.404C164.492 289.468 165.992 289.5 167.5 289.5Z"
              fill="url(#paint10_radial_3061_1044)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M167.5 289.5C224.661 289.5 271 243.161 271 186C271 185.499 270.996 184.999 270.989 184.5L183 184.5C171.954 184.5 163 193.454 163 204.5V289.404C164.492 289.468 165.992 289.5 167.5 289.5Z"
              fill="url(#paint11_radial_3061_1044)"
              fillOpacity="0.5"
            />
            <rect
              x="225.682"
              y="331.383"
              width="87"
              height="12.9036"
              rx="6.4518"
              transform="rotate(-45.711 225.682 331.383)"
              fill="url(#paint12_linear_3061_1044)"
            />
            <rect
              x="351.271"
              y="319.003"
              width="136.536"
              height="13.8648"
              rx="6.93238"
              transform="rotate(-66.6421 351.271 319.003)"
              fill="url(#paint13_linear_3061_1044)"
            />
            <rect
              width="87"
              height="12.9036"
              rx="6.4518"
              transform="matrix(-0.725165 -0.688575 -0.688575 0.725165 366.98 330.023)"
              fill="url(#paint14_linear_3061_1044)"
            />
            <circle cx="238.64" cy="325.73" r="21" fill="url(#paint15_radial_3061_1044)" />
            <circle cx="238.64" cy="325.73" r="21" fill="url(#paint16_radial_3061_1044)" fillOpacity="0.5" />
            <circle cx="238.64" cy="325.73" r="21" fill="url(#paint17_radial_3061_1044)" fillOpacity="0.8" />
            <circle cx="293.671" cy="271.73" r="21" fill="url(#paint18_radial_3061_1044)" />
            <circle cx="293.671" cy="271.73" r="21" fill="url(#paint19_radial_3061_1044)" fillOpacity="0.5" />
            <circle cx="293.671" cy="271.73" r="21" fill="url(#paint20_radial_3061_1044)" fillOpacity="0.8" />
            <circle cx="356.313" cy="325.618" r="21" fill="url(#paint21_radial_3061_1044)" />
            <circle cx="356.313" cy="325.618" r="21" fill="url(#paint22_radial_3061_1044)" fillOpacity="0.8" />
            <path
              d="M439.968 186.15C438.192 199.237 426.974 209.324 413.399 209.324C399.26 209.324 387.676 198.38 386.658 184.5H432C434.832 184.5 437.527 185.089 439.968 186.15Z"
              fill="url(#paint23_radial_3061_1044)"
            />
            <path
              d="M439.968 186.15C438.192 199.237 426.974 209.324 413.399 209.324C399.26 209.324 387.676 198.38 386.658 184.5H432C434.832 184.5 437.527 185.089 439.968 186.15Z"
              fill="url(#paint24_radial_3061_1044)"
            />
            <path
              d="M439.968 186.15C438.192 199.237 426.974 209.324 413.399 209.324C399.26 209.324 387.676 198.38 386.658 184.5H432C434.832 184.5 437.527 185.089 439.968 186.15Z"
              fill="url(#paint25_radial_3061_1044)"
              fillOpacity="0.8"
            />
            <path
              d="M439.968 186.15C438.192 199.237 426.974 209.324 413.399 209.324C399.26 209.324 387.676 198.38 386.658 184.5H432C434.832 184.5 437.527 185.089 439.968 186.15Z"
              fill="url(#paint26_radial_3061_1044)"
              fillOpacity="0.5"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M271 182.5V184.5H272.99C272.996 184.999 273 185.499 273 186C273 244.266 225.766 291.5 167.5 291.5C165.993 291.5 164.492 291.468 163 291.406V289.404L161 289.308V204.5C161 192.35 170.85 182.5 183 182.5H271ZM163 204.5V289.404C164.492 289.468 165.992 289.5 167.5 289.5C224.661 289.5 271 243.161 271 186C271 185.499 270.996 184.999 270.989 184.5H183C171.954 184.5 163 193.454 163 204.5Z"
              fill="#F2F1F3"
            />
            <circle cx="204.25" cy="211.988" r="3.5" fill="#B154FF" />
            <circle cx="107" cy="130.238" r="3.5" fill="#D6A5FF" />
            <circle cx="224.25" cy="164.738" r="3.5" fill="#D6A5FF" />
            <circle cx="180.75" cy="122.238" r="2.5" fill="#D6A5FF" />
            <circle cx="207.75" cy="163.738" r="2.5" fill="#D6A5FF" />
            <circle cx="118.25" cy="226.238" r="2.5" fill="#D6A5FF" />
            <circle cx="90.75" cy="185.994" r="2.5" fill="#D6A5FF" />
            <circle cx="137.25" cy="148.244" r="1" fill="#D6A5FF" />
            <circle cx="164.633" cy="165.238" r="1.5" fill="#D6A5FF" />
            <circle cx="167.633" cy="107.738" r="1.5" fill="#D6A5FF" />
            <circle cx="240.273" cy="159.244" r="1.5" fill="#D6A5FF" />
            <circle cx="232.023" cy="150.744" r="1.5" fill="#D6A5FF" />
            <circle cx="124.75" cy="243.822" r="1.5" fill="#D6A5FF" />
            <circle cx="124.75" cy="153.744" r="4" fill="#D6A5FF" />
            <circle cx="223.25" cy="252.994" r="3.5" fill="#B154FF" />
            <circle cx="215.25" cy="239.822" r="2.5" fill="#B154FF" />
            <circle cx="183.25" cy="205.988" r="2.5" fill="#B154FF" />
            <circle cx="178.25" cy="263.488" r="2.5" fill="#B154FF" />
            <circle cx="247.75" cy="209.988" r="2.5" fill="#B154FF" />
            <circle cx="227.75" cy="210.988" r="1" fill="#B154FF" />
            <circle cx="257" cy="203.488" r="1" fill="#B154FF" />
            <circle cx="213.75" cy="264.488" r="1" fill="#B154FF" />
            <circle cx="193" cy="233.238" r="1" fill="#B154FF" />
            <circle cx="179.25" cy="248.494" r="1" fill="#B154FF" />
            <circle cx="184.75" cy="255.494" r="1" fill="#B154FF" />
            <defs>
              <linearGradient
                id="paint0_linear_3061_1044"
                x1="434.485"
                y1="171.399"
                x2="241.505"
                y2="579.253"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.367698" stopColor="#E7E7E7" />
                <stop offset="0.713542" stopColor="#C9F5FF" />
              </linearGradient>
              <radialGradient
                id="paint1_radial_3061_1044"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(233.5 339.994) rotate(28.7059) scale(23.9426 38.6494)"
              >
                <stop offset="0.322917" stopColor="#6E7B83" />
                <stop offset="0.713542" stopColor="#9EA8AE" />
                <stop offset="0.957884" stopColor="#E4E9EA" stopOpacity="0" />
              </radialGradient>
              <radialGradient
                id="paint2_radial_3061_1044"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(288.5 284.994) rotate(23.8387) scale(23.5053 37.9435)"
              >
                <stop offset="0.322917" stopColor="#6E7B83" />
                <stop offset="0.713542" stopColor="#9EA8AE" />
                <stop offset="0.957884" stopColor="#E4E9EA" stopOpacity="0" />
              </radialGradient>
              <radialGradient
                id="paint3_radial_3061_1044"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(347.5 339.994) rotate(30.9637) scale(23.3238 37.4462)"
              >
                <stop offset="0.332951" stopColor="#6E7B83" />
                <stop offset="0.708333" stopColor="#9EA8AE" />
                <stop offset="1" stopColor="#DFEBEE" stopOpacity="0" />
              </radialGradient>
              <radialGradient
                id="paint4_radial_3061_1044"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(401.5 196.994) rotate(35.4171) scale(27.6089 42.0078)"
              >
                <stop offset="0.332951" stopColor="#949494" />
                <stop offset="0.737958" stopColor="#BDBDBD" />
                <stop offset="0.931599" stopColor="#E7E7E7" stopOpacity="0" />
              </radialGradient>
              <radialGradient
                id="paint5_radial_3061_1044"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(180.5 227) rotate(82.0811) scale(134.28 139.451)"
              >
                <stop offset="0.521657" stopColor="#9EA8AE" />
                <stop offset="0.684443" stopColor="#D4F0F7" stopOpacity="0" />
              </radialGradient>
              <linearGradient
                id="paint6_linear_3061_1044"
                x1="436.963"
                y1="152.302"
                x2="377.489"
                y2="242.334"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.267843" stopColor="#E7E7E7" />
                <stop offset="0.713542" stopColor="#C9F5FF" />
              </linearGradient>
              <radialGradient
                id="paint7_radial_3061_1044"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(167.5 147.006) rotate(165.746) scale(203.557 221.888)"
              >
                <stop offset="0.46884" stopColor="#FFEFE2" />
                <stop offset="0.906523" stopColor="#FFF7F1" />
              </radialGradient>
              <radialGradient
                id="paint8_radial_3061_1044"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(146.435 221.376) rotate(-35.1972) scale(243.886 275.366)"
              >
                <stop offset="0.440888" stopColor="#E7C0A8" stopOpacity="0" />
                <stop offset="0.540596" stopColor="#B59174" />
              </radialGradient>
              <radialGradient
                id="paint9_radial_3061_1044"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(167.5 289.506) rotate(-90) scale(184.536 61.2688)"
              >
                <stop offset="0.255305" stopColor="#B59174" />
                <stop offset="0.728744" stopColor="#E7C0A8" stopOpacity="0" />
              </radialGradient>
              <radialGradient
                id="paint10_radial_3061_1044"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(168.261 261.801) rotate(-45.3951) scale(248.654 306.794)"
              >
                <stop offset="0.187649" stopColor="#FFD84E" />
                <stop offset="0.369792" stopColor="#FE843A" />
              </radialGradient>
              <radialGradient
                id="paint11_radial_3061_1044"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(217 184.5) rotate(-180) scale(125.534 55.7931)"
              >
                <stop offset="0.330298" stopColor="#C84B00" />
                <stop offset="0.607194" stopColor="#FF853B" stopOpacity="0" />
              </radialGradient>
              <linearGradient
                id="paint12_linear_3061_1044"
                x1="265.238"
                y1="316.105"
                x2="264.913"
                y2="346.126"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.597549" stopColor="#E2D7CF" />
                <stop offset="0.739583" stopColor="#D5BFAF" />
                <stop offset="0.832491" stopColor="#B89F8C" />
                <stop offset="0.933497" stopColor="#CEBCAF" />
                <stop offset="1" stopColor="#E2D7CF" />
              </linearGradient>
              <linearGradient
                id="paint13_linear_3061_1044"
                x1="413.35"
                y1="302.587"
                x2="413.111"
                y2="334.846"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.597549" stopColor="#E2D7CF" />
                <stop offset="0.739583" stopColor="#D5BFAF" />
                <stop offset="0.832491" stopColor="#B89F8C" />
                <stop offset="0.933497" stopColor="#CEBCAF" />
                <stop offset="1" stopColor="#E2D7CF" />
              </linearGradient>
              <linearGradient
                id="paint14_linear_3061_1044"
                x1="39.5559"
                y1="-15.2778"
                x2="39.2316"
                y2="14.7428"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.597549" stopColor="#E2D7CF" />
                <stop offset="0.739583" stopColor="#D5BFAF" />
                <stop offset="0.832491" stopColor="#B89F8C" />
                <stop offset="0.933497" stopColor="#CEBCAF" />
                <stop offset="1" stopColor="#E2D7CF" />
              </linearGradient>
              <radialGradient
                id="paint15_radial_3061_1044"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(242.612 316.106) rotate(108.435) scale(38.6064)"
              >
                <stop stopColor="#F1FFB7" />
                <stop offset="0.25" stopColor="#B9DC4E" />
                <stop offset="0.645065" stopColor="#6FB12F" />
                <stop offset="1" stopColor="#3E6419" />
              </radialGradient>
              <radialGradient
                id="paint16_radial_3061_1044"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(237.916 346.73) rotate(-90) scale(15.2069 30.0517)"
              >
                <stop stopColor="#3E6419" />
                <stop offset="1" stopColor="#3E6419" stopOpacity="0" />
              </radialGradient>
              <radialGradient
                id="paint17_radial_3061_1044"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(238.64 325.73) rotate(97.8153) scale(37.2773)"
              >
                <stop offset="0.446038" stopColor="white" stopOpacity="0" />
                <stop offset="0.841379" stopColor="white" />
              </radialGradient>
              <radialGradient
                id="paint18_radial_3061_1044"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(297.643 262.106) rotate(108.435) scale(38.6064)"
              >
                <stop stopColor="#BCF2FF" />
                <stop offset="0.25" stopColor="#4ECBFF" />
                <stop offset="0.645065" stopColor="#0083F5" />
                <stop offset="1" stopColor="#C955FF" />
              </radialGradient>
              <radialGradient
                id="paint19_radial_3061_1044"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(292.947 292.73) rotate(-90) scale(15.2069 30.0517)"
              >
                <stop stopColor="#DEB3FF" />
                <stop offset="1" stopColor="#CC99FF" stopOpacity="0" />
              </radialGradient>
              <radialGradient
                id="paint20_radial_3061_1044"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(293.671 271.73) rotate(97.8153) scale(37.2773)"
              >
                <stop offset="0.446038" stopColor="white" stopOpacity="0" />
                <stop offset="0.841379" stopColor="white" />
              </radialGradient>
              <radialGradient
                id="paint21_radial_3061_1044"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(360.285 315.994) rotate(108.435) scale(38.6064)"
              >
                <stop offset="0.0677083" stopColor="#FFE39A" />
                <stop offset="0.25" stopColor="#FFB900" />
                <stop offset="0.645065" stopColor="#E68400" />
                <stop offset="1" stopColor="#FFB900" />
              </radialGradient>
              <radialGradient
                id="paint22_radial_3061_1044"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(356.313 325.618) rotate(97.8153) scale(37.2773)"
              >
                <stop offset="0.446038" stopColor="white" stopOpacity="0" />
                <stop offset="0.841379" stopColor="white" />
              </radialGradient>
              <radialGradient
                id="paint23_radial_3061_1044"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(417.408 174.827) rotate(120.689) scale(50.6736 50.6736)"
              >
                <stop offset="0.103226" stopColor="#F4A0C3" />
                <stop offset="0.322917" stopColor="#F481B1" />
                <stop offset="0.510417" stopColor="#F272A7" />
                <stop offset="0.78125" stopColor="#EB70A3" />
              </radialGradient>
              <radialGradient
                id="paint24_radial_3061_1044"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(417.762 170.93) rotate(104.486) scale(39.6562 39.6562)"
              >
                <stop stopColor="#FFBCD8" />
                <stop offset="0.806053" stopColor="#FFBCD8" stopOpacity="0" />
              </radialGradient>
              <radialGradient
                id="paint25_radial_3061_1044"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(413.399 182.51) rotate(97.8153) scale(47.5979 47.5979)"
              >
                <stop offset="0.446038" stopColor="white" stopOpacity="0" />
                <stop offset="0.841379" stopColor="white" />
              </radialGradient>
              <radialGradient
                id="paint26_radial_3061_1044"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(412.475 209.324) rotate(-90) scale(19.4171 38.3719)"
              >
                <stop stopColor="#FFB3BB" />
                <stop offset="1" stopColor="#FE625D" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        ) : (
          <svg
            width={this.props.width}
            height={height}
            viewBox="0 0 512 513"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="163" y="184.5" width="289" height="207" rx="20" fill="url(#paint0_linear_3061_1072)" />
            <rect
              x="163"
              y="184.5"
              width="289"
              height="207"
              rx="20"
              fill="url(#paint1_radial_3061_1072)"
              fillOpacity="0.7"
            />
            <rect
              x="163"
              y="184.5"
              width="289"
              height="207"
              rx="20"
              fill="url(#paint2_radial_3061_1072)"
              fillOpacity="0.7"
            />
            <rect
              x="163"
              y="184.5"
              width="289"
              height="207"
              rx="20"
              fill="url(#paint3_radial_3061_1072)"
              fillOpacity="0.7"
            />
            <rect
              x="163"
              y="184.5"
              width="289"
              height="207"
              rx="20"
              fill="url(#paint4_radial_3061_1072)"
              fillOpacity="0.8"
            />
            <rect
              x="163"
              y="184.5"
              width="289"
              height="207"
              rx="20"
              fill="url(#paint5_radial_3061_1072)"
              fillOpacity="0.6"
            />
            <circle cx="413.399" cy="182.51" r="26.8141" fill="url(#paint6_linear_3061_1072)" />
            <circle cx="167.5" cy="186" r="103.5" fill="url(#paint7_linear_3061_1072)" />
            <circle cx="167.5" cy="186" r="103.5" fill="url(#paint8_radial_3061_1072)" />
            <circle cx="167.5" cy="186" r="103.5" fill="url(#paint9_radial_3061_1072)" fillOpacity="0.6" />
            <circle cx="167.5" cy="186" r="103.5" fill="url(#paint10_radial_3061_1072)" fillOpacity="0.5" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M167.632 289.828C224.794 289.828 271.132 243.489 271.132 186.328C271.132 185.827 271.129 185.327 271.122 184.828L183.132 184.828C172.087 184.828 163.132 193.782 163.132 204.828V289.732C164.624 289.796 166.125 289.828 167.632 289.828Z"
              fill="url(#paint11_radial_3061_1072)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M167.632 289.828C224.794 289.828 271.132 243.489 271.132 186.328C271.132 185.827 271.129 185.327 271.122 184.828L183.132 184.828C172.087 184.828 163.132 193.782 163.132 204.828V289.732C164.624 289.796 166.125 289.828 167.632 289.828Z"
              fill="url(#paint12_radial_3061_1072)"
              fillOpacity="0.5"
            />
            <rect
              x="225.682"
              y="331.383"
              width="87"
              height="12.9036"
              rx="6.4518"
              transform="rotate(-45.711 225.682 331.383)"
              fill="url(#paint13_linear_3061_1072)"
            />
            <rect
              x="351.271"
              y="319.003"
              width="136.536"
              height="13.8648"
              rx="6.93238"
              transform="rotate(-66.6421 351.271 319.003)"
              fill="url(#paint14_linear_3061_1072)"
            />
            <rect
              width="87"
              height="12.9036"
              rx="6.4518"
              transform="matrix(-0.725165 -0.688575 -0.688575 0.725165 366.98 330.023)"
              fill="url(#paint15_linear_3061_1072)"
            />
            <circle cx="238.772" cy="326.058" r="21" fill="url(#paint16_radial_3061_1072)" />
            <circle cx="238.772" cy="326.058" r="21" fill="url(#paint17_radial_3061_1072)" fillOpacity="0.5" />
            <circle cx="238.772" cy="326.058" r="21" fill="url(#paint18_radial_3061_1072)" fillOpacity="0.8" />
            <circle cx="293.803" cy="272.058" r="21" fill="url(#paint19_radial_3061_1072)" />
            <circle cx="293.803" cy="272.058" r="21" fill="url(#paint20_radial_3061_1072)" fillOpacity="0.5" />
            <circle cx="293.803" cy="272.058" r="21" fill="url(#paint21_radial_3061_1072)" fillOpacity="0.8" />
            <circle cx="356.313" cy="325.618" r="21" fill="url(#paint22_radial_3061_1072)" />
            <circle cx="356.313" cy="325.618" r="21" fill="url(#paint23_radial_3061_1072)" fillOpacity="0.8" />
            <path
              d="M440.101 186.478C438.324 199.565 427.106 209.652 413.532 209.652C399.392 209.652 387.809 198.708 386.79 184.828H432.132C434.965 184.828 437.659 185.417 440.101 186.478Z"
              fill="url(#paint24_radial_3061_1072)"
            />
            <path
              d="M440.101 186.478C438.324 199.565 427.106 209.652 413.532 209.652C399.392 209.652 387.809 198.708 386.79 184.828H432.132C434.965 184.828 437.659 185.417 440.101 186.478Z"
              fill="url(#paint25_radial_3061_1072)"
            />
            <path
              d="M440.101 186.478C438.324 199.565 427.106 209.652 413.532 209.652C399.392 209.652 387.809 198.708 386.79 184.828H432.132C434.965 184.828 437.659 185.417 440.101 186.478Z"
              fill="url(#paint26_radial_3061_1072)"
              fillOpacity="0.8"
            />
            <path
              d="M440.101 186.478C438.324 199.565 427.106 209.652 413.532 209.652C399.392 209.652 387.809 198.708 386.79 184.828H432.132C434.965 184.828 437.659 185.417 440.101 186.478Z"
              fill="url(#paint27_radial_3061_1072)"
              fillOpacity="0.5"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M271 182.5V184.5H272.99C272.996 184.999 273 185.499 273 186C273 244.266 225.766 291.5 167.5 291.5C165.993 291.5 164.492 291.468 163 291.406V289.404L161 289.308V204.5C161 192.35 170.85 182.5 183 182.5H271ZM163 204.5V289.404C164.492 289.468 165.992 289.5 167.5 289.5C224.661 289.5 271 243.161 271 186C271 185.499 270.996 184.999 270.989 184.5H183C171.954 184.5 163 193.454 163 204.5Z"
              fill="#515050"
            />
            <circle cx="204.25" cy="211.994" r="3.5" fill="#B154FF" />
            <circle cx="107" cy="130.244" r="3.5" fill="#D6A5FF" />
            <circle cx="224.25" cy="164.744" r="3.5" fill="#047DDA" />
            <circle cx="180.75" cy="122.244" r="2.5" fill="#047DDA" />
            <circle cx="207.75" cy="163.744" r="2.5" fill="#D6A5FF" />
            <circle cx="118.25" cy="226.244" r="2.5" fill="#D6A5FF" />
            <circle cx="90.75" cy="186" r="2.5" fill="#D6A5FF" />
            <circle cx="137.25" cy="148.25" r="1" fill="#047DDA" />
            <circle cx="164.633" cy="165.244" r="1.5" fill="#D6A5FF" />
            <circle cx="167.633" cy="107.744" r="1.5" fill="#D6A5FF" />
            <circle cx="240.273" cy="159.25" r="1.5" fill="#047DDA" />
            <circle cx="232.023" cy="150.75" r="1.5" fill="#047DDA" />
            <circle cx="124.75" cy="243.828" r="1.5" fill="#D6A5FF" />
            <circle cx="124.75" cy="153.75" r="4" fill="#047DDA" />
            <circle cx="223.25" cy="253" r="3.5" fill="#B154FF" />
            <circle cx="215.25" cy="239.828" r="2.5" fill="#B154FF" />
            <circle cx="183.25" cy="205.994" r="2.5" fill="#B154FF" />
            <circle cx="178.25" cy="263.494" r="2.5" fill="#B154FF" />
            <circle cx="247.75" cy="209.994" r="2.5" fill="#B154FF" />
            <circle cx="227.75" cy="210.994" r="1" fill="#B154FF" />
            <circle cx="257" cy="203.494" r="1" fill="#B154FF" />
            <circle cx="213.75" cy="264.494" r="1" fill="#B154FF" />
            <circle cx="193" cy="233.244" r="1" fill="#B154FF" />
            <circle cx="179.25" cy="248.5" r="1" fill="#B154FF" />
            <circle cx="184.75" cy="255.5" r="1" fill="#B154FF" />
            <defs>
              <linearGradient
                id="paint0_linear_3061_1072"
                x1="434.485"
                y1="171.399"
                x2="241.505"
                y2="579.253"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.367698" stopColor="#414141" />
                <stop offset="0.609066" stopColor="#40888D" />
                <stop offset="0.788937" stopColor="#3EF3FF" />
              </linearGradient>
              <radialGradient
                id="paint1_radial_3061_1072"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(232.5 343.994) rotate(26.565) scale(24.5967 39.7053)"
              >
                <stop offset="0.322917" stopColor="#16292B" />
                <stop offset="0.713542" stopColor="#1B3536" />
                <stop offset="0.957884" stopColor="#416F72" stopOpacity="0" />
              </radialGradient>
              <radialGradient
                id="paint2_radial_3061_1072"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(349 341.494) rotate(24.444) scale(24.1661 38.7985)"
              >
                <stop offset="0.332951" stopColor="#1B3536" />
                <stop offset="0.708333" stopColor="#1B3536" />
                <stop offset="1" stopColor="#415E60" stopOpacity="0" />
              </radialGradient>
              <radialGradient
                id="paint3_radial_3061_1072"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(288.5 290.994) rotate(24.6236) scale(26.4008 42.3862)"
              >
                <stop offset="0.332951" stopColor="#1F2727" />
                <stop offset="0.708333" stopColor="#1F2727" />
                <stop offset="1" stopColor="#414C4D" stopOpacity="0" />
              </radialGradient>
              <radialGradient
                id="paint4_radial_3061_1072"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(401 199.494) rotate(33.1798) scale(28.0971 42.7506)"
              >
                <stop offset="0.332951" stopColor="#262626" />
                <stop offset="0.78125" stopColor="#353535" />
                <stop offset="0.931599" stopColor="#424242" stopOpacity="0" />
              </radialGradient>
              <radialGradient
                id="paint5_radial_3061_1072"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(173 228.494) rotate(82.4577) scale(144.752 150.326)"
              >
                <stop offset="0.521657" stopColor="#162B2C" />
                <stop offset="0.684443" stopColor="#416F72" stopOpacity="0" />
              </radialGradient>
              <linearGradient
                id="paint6_linear_3061_1072"
                x1="413"
                y1="116"
                x2="379.819"
                y2="276.148"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.367698" stopColor="#414141" />
                <stop offset="0.713542" stopColor="#3EF3FF" />
              </linearGradient>
              <linearGradient
                id="paint7_linear_3061_1072"
                x1="230.506"
                y1="82.5"
                x2="94.7001"
                y2="425.086"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#2A2C6F" />
                <stop offset="0.243355" stopColor="#2A2C6F" />
                <stop offset="0.513937" stopColor="#2C2C2C" />
                <stop offset="0.768119" stopColor="#2C2C2C" />
              </linearGradient>
              <radialGradient
                id="paint8_radial_3061_1072"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(207.871 109.012) rotate(126.01) scale(193.869 174.714)"
              >
                <stop offset="0.881831" stopColor="#595959" stopOpacity="0" />
                <stop offset="1" stopColor="#858585" />
              </radialGradient>
              <radialGradient
                id="paint9_radial_3061_1072"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(146.435 221.376) rotate(-35.1972) scale(243.886 275.366)"
              >
                <stop offset="0.440888" stopColor="#2B2D70" stopOpacity="0" />
                <stop offset="0.540596" stopColor="#141414" />
              </radialGradient>
              <radialGradient
                id="paint10_radial_3061_1072"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(167.5 289.506) rotate(-90) scale(152.201 50.5332)"
              >
                <stop offset="0.255305" />
                <stop offset="0.728744" stopOpacity="0" />
              </radialGradient>
              <radialGradient
                id="paint11_radial_3061_1072"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(168.393 262.129) rotate(-45.3951) scale(248.654 306.794)"
              >
                <stop offset="0.187649" stopColor="#FFD84E" />
                <stop offset="0.369792" stopColor="#FE843A" />
              </radialGradient>
              <radialGradient
                id="paint12_radial_3061_1072"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(217.132 184.828) rotate(-180) scale(125.534 55.7931)"
              >
                <stop offset="0.330298" stopColor="#C84B00" />
                <stop offset="0.607194" stopColor="#FF853B" stopOpacity="0" />
              </radialGradient>
              <linearGradient
                id="paint13_linear_3061_1072"
                x1="265.238"
                y1="316.105"
                x2="264.913"
                y2="346.126"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.597549" stopColor="#807C78" />
                <stop offset="0.739583" stopColor="#463F38" />
                <stop offset="0.832491" stopColor="#2E251E" />
                <stop offset="0.933497" stopColor="#463F38" />
                <stop offset="1" stopColor="#807C78" />
              </linearGradient>
              <linearGradient
                id="paint14_linear_3061_1072"
                x1="413.35"
                y1="302.587"
                x2="413.111"
                y2="334.846"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.597549" stopColor="#807C78" />
                <stop offset="0.739583" stopColor="#463F38" />
                <stop offset="0.832491" stopColor="#2E251E" />
                <stop offset="0.933497" stopColor="#463F38" />
                <stop offset="1" stopColor="#807C78" />
              </linearGradient>
              <linearGradient
                id="paint15_linear_3061_1072"
                x1="39.5559"
                y1="-15.2778"
                x2="39.2316"
                y2="14.7428"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.597549" stopColor="#807C78" />
                <stop offset="0.739583" stopColor="#463F38" />
                <stop offset="0.832491" stopColor="#2E251E" />
                <stop offset="0.933497" stopColor="#463F38" />
                <stop offset="1" stopColor="#807C78" />
              </linearGradient>
              <radialGradient
                id="paint16_radial_3061_1072"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(242.744 316.434) rotate(108.435) scale(38.6064)"
              >
                <stop stopColor="#F1FFB7" />
                <stop offset="0.25" stopColor="#B9DC4E" />
                <stop offset="0.645065" stopColor="#6FB12F" />
                <stop offset="1" stopColor="#FF7C03" />
              </radialGradient>
              <radialGradient
                id="paint17_radial_3061_1072"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(238.048 347.058) rotate(-90) scale(15.2069 30.0517)"
              >
                <stop stopColor="#FFAB5D" />
                <stop offset="1" stopColor="#FFC499" stopOpacity="0" />
              </radialGradient>
              <radialGradient
                id="paint18_radial_3061_1072"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(238.772 326.058) rotate(97.8153) scale(37.2773)"
              >
                <stop offset="0.446038" stopColor="white" stopOpacity="0" />
                <stop offset="0.841379" stopColor="white" />
              </radialGradient>
              <radialGradient
                id="paint19_radial_3061_1072"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(297.775 262.434) rotate(108.435) scale(38.6064)"
              >
                <stop stopColor="#BCF2FF" />
                <stop offset="0.25" stopColor="#4ECBFF" />
                <stop offset="0.645065" stopColor="#0083F5" />
                <stop offset="1" stopColor="#C955FF" />
              </radialGradient>
              <radialGradient
                id="paint20_radial_3061_1072"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(293.079 293.058) rotate(-90) scale(15.2069 30.0517)"
              >
                <stop stopColor="#DEB3FF" />
                <stop offset="1" stopColor="#CC99FF" stopOpacity="0" />
              </radialGradient>
              <radialGradient
                id="paint21_radial_3061_1072"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(293.803 272.058) rotate(97.8153) scale(37.2773)"
              >
                <stop offset="0.446038" stopColor="white" stopOpacity="0" />
                <stop offset="0.841379" stopColor="white" />
              </radialGradient>
              <radialGradient
                id="paint22_radial_3061_1072"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(360.285 315.994) rotate(108.435) scale(38.6064)"
              >
                <stop offset="0.0677083" stopColor="#FFE39A" />
                <stop offset="0.25" stopColor="#FFB900" />
                <stop offset="0.645065" stopColor="#E68400" />
                <stop offset="1" stopColor="#FFB900" />
              </radialGradient>
              <radialGradient
                id="paint23_radial_3061_1072"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(356.313 325.618) rotate(97.8153) scale(37.2773)"
              >
                <stop offset="0.446038" stopColor="white" stopOpacity="0" />
                <stop offset="0.841379" stopColor="white" />
              </radialGradient>
              <radialGradient
                id="paint24_radial_3061_1072"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(417.54 175.155) rotate(120.689) scale(50.6736 50.6736)"
              >
                <stop offset="0.103226" stopColor="#F4A0C3" />
                <stop offset="0.322917" stopColor="#F481B1" />
                <stop offset="0.510417" stopColor="#F272A7" />
                <stop offset="0.78125" stopColor="#EB70A3" />
              </radialGradient>
              <radialGradient
                id="paint25_radial_3061_1072"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(418.603 170.195) rotate(123.541) scale(18.9152)"
              >
                <stop stopColor="#FFBCD8" />
                <stop offset="0.573279" stopColor="#FFBCD8" stopOpacity="0.57836" />
                <stop offset="1" stopColor="#EB80AD" stopOpacity="0" />
              </radialGradient>
              <radialGradient
                id="paint26_radial_3061_1072"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(413.532 182.838) rotate(97.8153) scale(47.5979 47.5979)"
              >
                <stop offset="0.446038" stopColor="white" stopOpacity="0" />
                <stop offset="0.841379" stopColor="white" />
              </radialGradient>
              <radialGradient
                id="paint27_radial_3061_1072"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(412.607 209.652) rotate(-90) scale(19.4171 38.3719)"
              >
                <stop stopColor="#FFB3BB" />
                <stop offset="1" stopColor="#FE625D" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        )}
      </div>
    );
  }
}

export default MissingDataImage;
