import { ITheme } from '@fluentui/react/lib/Styling';
import * as React from 'react';
interface IErrorImageProps {
  theme?: ITheme;
  width: number;
  height: number;
}
class ErrorImage extends React.Component<IErrorImageProps, {}> {
  constructor(props: IErrorImageProps) {
    super(props);
  }

  render() {
    const height = this.props.width * 0.8;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        {!this.props.theme!.isInverted ? (
          <svg
            width={this.props.width}
            height={height}
            viewBox="0 0 512 513"
            transform="scale(1.0)"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M405.325 442.075H112.237C85.0724 442.075 68.2626 412.475 82.1788 389.145L227.706 145.175C241.235 122.495 274.047 122.395 287.713 144.991L435.273 388.961C449.381 412.287 432.585 442.075 405.325 442.075Z"
              fill="url(#paint0_linear_3094_825)"
            />
            <path
              d="M405.325 442.075H112.237C85.0724 442.075 68.2626 412.475 82.1788 389.145L227.706 145.175C241.235 122.495 274.047 122.395 287.713 144.991L435.273 388.961C449.381 412.287 432.585 442.075 405.325 442.075Z"
              fill="url(#paint1_radial_3094_825)"
              fill-opacity="0.25"
            />
            <path
              d="M405.325 442.075H112.237C85.0724 442.075 68.2626 412.475 82.1788 389.145L227.706 145.175C241.235 122.495 274.047 122.395 287.713 144.991L435.273 388.961C449.381 412.287 432.585 442.075 405.325 442.075Z"
              fill="url(#paint2_radial_3094_825)"
              fill-opacity="0.25"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M256.929 282.766C236.99 282.766 220.826 267.138 220.826 247.859L220.826 84.7186C220.826 65.4404 236.99 49.8123 256.929 49.8123C276.868 49.8123 293.031 65.4404 293.031 84.7186L293.031 247.859C293.031 267.138 276.868 282.766 256.929 282.766Z"
              fill="url(#paint3_radial_3094_825)"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M256.929 282.766C236.99 282.766 220.826 267.138 220.826 247.859L220.826 84.7186C220.826 65.4404 236.99 49.8123 256.929 49.8123C276.868 49.8123 293.031 65.4404 293.031 84.7186L293.031 247.859C293.031 267.138 276.868 282.766 256.929 282.766Z"
              fill="url(#paint4_radial_3094_825)"
              fill-opacity="0.8"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M256.929 282.766C236.99 282.766 220.826 267.138 220.826 247.859L220.826 84.7186C220.826 65.4404 236.99 49.8123 256.929 49.8123C276.868 49.8123 293.031 65.4404 293.031 84.7186L293.031 247.859C293.031 267.138 276.868 282.766 256.929 282.766Z"
              fill="url(#paint5_radial_3094_825)"
              fill-opacity="0.8"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M256.929 282.766C236.99 282.766 220.826 267.138 220.826 247.859L220.826 84.7186C220.826 65.4404 236.99 49.8123 256.929 49.8123C276.868 49.8123 293.031 65.4404 293.031 84.7186L293.031 247.859C293.031 267.138 276.868 282.766 256.929 282.766Z"
              fill="url(#paint6_radial_3094_825)"
              fill-opacity="0.3"
            />
            <circle cx="255.869" cy="344.491" r="38.505" fill="url(#paint7_radial_3094_825)" />
            <circle cx="255.869" cy="344.491" r="38.505" fill="url(#paint8_radial_3094_825)" fill-opacity="0.5" />
            <circle cx="255.869" cy="344.491" r="38.505" fill="url(#paint9_radial_3094_825)" fill-opacity="0.8" />
            <path
              d="M240.161 77.8529C240.896 78.4945 242.228 78.1722 243.138 77.1327C244.044 76.0931 244.188 74.7303 243.454 74.0887C242.72 73.4471 241.388 73.7699 240.481 74.8089C239.571 75.8485 239.427 77.2113 240.161 77.8529Z"
              fill="#FEE39E"
            />
            <path
              d="M246.212 89.9652C246.505 89.8299 246.771 89.6405 246.993 89.4095C247.435 88.9505 247.708 88.327 247.708 87.6405C247.708 86.2293 246.563 85.0853 245.153 85.0853C243.743 85.0853 242.599 86.2293 242.599 87.6405C242.599 88.4149 242.942 89.1087 243.485 89.5775C243.935 89.9627 244.517 90.1956 245.153 90.1956C245.532 90.1956 245.892 90.1131 246.212 89.9652Z"
              fill="#FEE39E"
            />
            <path
              d="M284.888 167.673C285.032 167.473 285.149 167.25 285.235 167.012C285.329 166.746 285.38 166.46 285.38 166.163C285.38 164.752 284.235 163.608 282.825 163.608C281.415 163.608 280.271 164.752 280.271 166.163C280.271 167.574 281.415 168.718 282.825 168.718C283.673 168.718 284.423 168.306 284.888 167.673Z"
              fill="#FEE39E"
            />
            <path
              d="M287.935 239.068C287.935 240.479 286.79 241.623 285.38 241.623C285.185 241.623 284.993 241.601 284.81 241.559L284.63 241.511L284.505 241.47L284.407 241.431L284.259 241.365L284.091 241.275C283.333 240.832 282.825 240.01 282.825 239.068C282.825 237.657 283.97 236.513 285.38 236.513C286.79 236.513 287.935 237.657 287.935 239.068Z"
              fill="#FEE39E"
            />
            <path
              d="M227.38 214.853C227.634 214.424 227.786 213.888 227.786 213.307C227.786 211.896 226.896 210.752 225.794 210.752C224.692 210.752 223.802 211.896 223.802 213.307C223.802 214.718 224.692 215.862 225.794 215.862C226.442 215.862 227.017 215.467 227.38 214.853Z"
              fill="#FEE39E"
            />
            <path
              d="M241.915 101.515C241.591 101.779 241.177 101.936 240.728 101.936C240.146 101.936 239.626 101.676 239.278 101.265C239.2 101.17 239.13 101.067 239.067 100.958C239.032 100.893 239.001 100.827 238.974 100.758L238.923 100.619C238.864 100.438 238.833 100.244 238.833 100.044C238.833 99.3573 239.2 98.7562 239.747 98.4242C239.931 98.3133 240.134 98.2323 240.353 98.1883C240.474 98.1639 240.599 98.1507 240.728 98.1507C241.771 98.1507 242.618 98.9984 242.618 100.044C242.618 100.395 242.524 100.725 242.356 101.007C242.239 101.202 242.091 101.373 241.915 101.515Z"
              fill="#FEE39E"
            />
            <path
              d="M271.794 109.03C272.837 109.03 273.685 108.183 273.685 107.138L273.681 106.994L273.646 106.746C273.587 106.464 273.466 106.204 273.294 105.983C273.032 105.646 272.661 105.399 272.235 105.296C272.095 105.263 271.946 105.244 271.794 105.244C271.122 105.244 270.532 105.594 270.196 106.12C270.11 106.258 270.04 106.408 269.989 106.566C269.931 106.746 269.899 106.938 269.899 107.138C269.899 108.183 270.747 109.03 271.794 109.03Z"
              fill="#FEE39E"
            />
            <path
              d="M275.575 153.37C275.575 154.416 274.728 155.263 273.685 155.263C272.638 155.263 271.79 154.416 271.79 153.37C271.79 152.325 272.638 151.477 273.685 151.477C273.88 151.477 274.067 151.507 274.243 151.561C274.587 151.667 274.888 151.869 275.118 152.137C275.263 152.306 275.376 152.499 275.454 152.712C275.532 152.917 275.575 153.139 275.575 153.37Z"
              fill="#FEE39E"
            />
            <path
              d="M244.513 196.359C245.556 196.359 246.403 195.512 246.403 194.466C246.403 194.222 246.356 193.989 246.274 193.774C246.157 193.474 245.962 193.211 245.72 193.008C245.392 192.737 244.97 192.573 244.513 192.573C243.466 192.573 242.618 193.421 242.618 194.466C242.618 195.117 242.946 195.69 243.446 196.031C243.751 196.238 244.118 196.359 244.513 196.359Z"
              fill="#FEE39E"
            />
            <path
              d="M273.833 244.897C273.493 245.215 273.04 245.409 272.54 245.409C272.017 245.409 271.54 245.196 271.196 244.851C270.856 244.509 270.646 244.037 270.646 243.516C270.646 242.471 271.493 241.623 272.54 241.623C273.583 241.623 274.431 242.471 274.431 243.516C274.431 244.061 274.2 244.552 273.833 244.897Z"
              fill="#FEE39E"
            />
            <defs>
              <linearGradient
                id="paint0_linear_3094_825"
                x1="418.367"
                y1="108.233"
                x2="92.3322"
                y2="679.162"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.367698" stop-color="#E7E7E7" />
                <stop offset="0.788937" stop-color="#FEE39E" />
              </linearGradient>
              <radialGradient
                id="paint1_radial_3094_825"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(241 187.403) rotate(92.1211) scale(135.093 58.2199)"
              >
                <stop offset="0.706027" stop-color="#717171" />
                <stop offset="1" stop-color="#717171" stop-opacity="0" />
              </radialGradient>
              <radialGradient
                id="paint2_radial_3094_825"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(242 373.403) rotate(-73.8631) scale(60.3789 37.3609)"
              >
                <stop offset="0.610863" stop-color="#717171" />
                <stop offset="1" stop-color="#717171" stop-opacity="0" />
              </radialGradient>
              <radialGradient
                id="paint3_radial_3094_825"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(278.262 192.835) scale(98.4615 780.258)"
              >
                <stop stop-color="#FE983A" />
                <stop offset="0.0572917" stop-color="#FE983A" />
                <stop offset="0.189101" stop-color="#FE7A3A" />
                <stop offset="0.45303" stop-color="#E33812" />
                <stop offset="0.933333" stop-color="#FE7A3A" />
              </radialGradient>
              <radialGradient
                id="paint4_radial_3094_825"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(337.969 60.4475) rotate(109.904) scale(302.162 129.693)"
              >
                <stop offset="0.611939" stop-color="#F6EDE3" stop-opacity="0" />
                <stop offset="0.827781" stop-color="#E56F15" />
                <stop offset="0.887395" stop-color="#F15721" />
                <stop offset="1" stop-color="#F15721" />
              </radialGradient>
              <radialGradient
                id="paint5_radial_3094_825"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(319.288 307.073) rotate(-105.419) scale(296.26 126.511)"
              >
                <stop offset="0.738935" stop-color="#FB7F2C" stop-opacity="0" />
                <stop offset="0.932709" stop-color="#FB7F2C" />
              </radialGradient>
              <radialGradient
                id="paint6_radial_3094_825"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(272.924 67.3569) rotate(54.7395) scale(75.2032 59.7918)"
              >
                <stop stop-color="white" />
                <stop offset="0.109375" stop-color="white" />
                <stop offset="0.262522" stop-color="white" stop-opacity="0" />
              </radialGradient>
              <radialGradient
                id="paint7_radial_3094_825"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(263.152 326.845) rotate(108.435) scale(70.7875)"
              >
                <stop offset="0.0677083" stop-color="#FFC56D" />
                <stop offset="0.25" stop-color="#FF9B04" />
                <stop offset="0.645065" stop-color="#E66000" />
                <stop offset="1" stop-color="#CBFBB5" />
              </radialGradient>
              <radialGradient
                id="paint8_radial_3094_825"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(254.541 382.996) rotate(-90) scale(27.8829 55.102)"
              >
                <stop stop-color="#CBFBB5" />
                <stop offset="1" stop-color="#CBFBB5" stop-opacity="0" />
              </radialGradient>
              <radialGradient
                id="paint9_radial_3094_825"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(255.869 344.491) rotate(97.8153) scale(68.3506)"
              >
                <stop offset="0.446038" stop-color="white" stop-opacity="0" />
                <stop offset="0.841379" stop-color="white" />
              </radialGradient>
            </defs>
          </svg>
        ) : (
          <svg
            width={this.props.width}
            height={height}
            viewBox="0 0 512 513"
            transform="scale(1.0)"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M405.325 442.075H112.237C85.0724 442.075 68.2626 412.475 82.1788 389.145L227.706 145.175C241.235 122.495 274.047 122.395 287.713 144.991L435.273 388.961C449.381 412.287 432.585 442.075 405.325 442.075Z"
              fill="url(#paint0_linear_3094_830)"
            />
            <path
              d="M405.325 442.075H112.237C85.0724 442.075 68.2626 412.475 82.1788 389.145L227.706 145.175C241.235 122.495 274.047 122.395 287.713 144.991L435.273 388.961C449.381 412.287 432.585 442.075 405.325 442.075Z"
              fill="url(#paint1_radial_3094_830)"
              fill-opacity="0.6"
            />
            <path
              d="M405.325 442.075H112.237C85.0724 442.075 68.2626 412.475 82.1788 389.145L227.706 145.175C241.235 122.495 274.047 122.395 287.713 144.991L435.273 388.961C449.381 412.287 432.585 442.075 405.325 442.075Z"
              fill="url(#paint2_radial_3094_830)"
              fill-opacity="0.6"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M256.929 282.766C236.99 282.766 220.826 267.138 220.826 247.859L220.826 84.7186C220.826 65.4404 236.99 49.8123 256.929 49.8123C276.868 49.8123 293.031 65.4404 293.031 84.7186L293.031 247.859C293.031 267.138 276.868 282.766 256.929 282.766Z"
              fill="url(#paint3_radial_3094_830)"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M256.929 282.766C236.99 282.766 220.826 267.138 220.826 247.859L220.826 84.7186C220.826 65.4404 236.99 49.8123 256.929 49.8123C276.868 49.8123 293.031 65.4404 293.031 84.7186L293.031 247.859C293.031 267.138 276.868 282.766 256.929 282.766Z"
              fill="url(#paint4_radial_3094_830)"
              fill-opacity="0.8"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M256.929 282.766C236.99 282.766 220.826 267.138 220.826 247.859L220.826 84.7186C220.826 65.4404 236.99 49.8123 256.929 49.8123C276.868 49.8123 293.031 65.4404 293.031 84.7186L293.031 247.859C293.031 267.138 276.868 282.766 256.929 282.766Z"
              fill="url(#paint5_radial_3094_830)"
              fill-opacity="0.8"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M256.929 282.766C236.99 282.766 220.826 267.138 220.826 247.859L220.826 84.7186C220.826 65.4404 236.99 49.8123 256.929 49.8123C276.868 49.8123 293.031 65.4404 293.031 84.7186L293.031 247.859C293.031 267.138 276.868 282.766 256.929 282.766Z"
              fill="url(#paint6_radial_3094_830)"
              fill-opacity="0.3"
            />
            <circle cx="255.869" cy="344.491" r="38.505" fill="url(#paint7_radial_3094_830)" />
            <circle cx="255.869" cy="344.491" r="38.505" fill="url(#paint8_radial_3094_830)" fill-opacity="0.5" />
            <circle cx="255.869" cy="344.491" r="38.505" fill="url(#paint9_radial_3094_830)" fill-opacity="0.8" />
            <path
              d="M240.161 77.8529C240.896 78.4945 242.228 78.1722 243.138 77.1327C244.044 76.0931 244.188 74.7303 243.454 74.0887C242.72 73.4471 241.388 73.7699 240.481 74.8089C239.571 75.8485 239.427 77.2113 240.161 77.8529Z"
              fill="#FEE39E"
            />
            <path
              d="M246.212 89.9652C246.505 89.8299 246.771 89.6405 246.993 89.4095C247.435 88.9505 247.708 88.327 247.708 87.6405C247.708 86.2293 246.563 85.0853 245.153 85.0853C243.743 85.0853 242.599 86.2293 242.599 87.6405C242.599 88.4149 242.942 89.1087 243.485 89.5775C243.935 89.9627 244.517 90.1956 245.153 90.1956C245.532 90.1956 245.892 90.1131 246.212 89.9652Z"
              fill="#FEE39E"
            />
            <path
              d="M284.888 167.673C285.032 167.473 285.149 167.25 285.235 167.012C285.329 166.746 285.38 166.46 285.38 166.163C285.38 164.752 284.235 163.608 282.825 163.608C281.415 163.608 280.271 164.752 280.271 166.163C280.271 167.574 281.415 168.718 282.825 168.718C283.673 168.718 284.423 168.306 284.888 167.673Z"
              fill="#FEE39E"
            />
            <path
              d="M287.935 239.068C287.935 240.479 286.79 241.623 285.38 241.623C285.185 241.623 284.993 241.601 284.81 241.559L284.63 241.511L284.505 241.47L284.407 241.431L284.259 241.365L284.091 241.275C283.333 240.832 282.825 240.01 282.825 239.068C282.825 237.657 283.97 236.513 285.38 236.513C286.79 236.513 287.935 237.657 287.935 239.068Z"
              fill="#FEE39E"
            />
            <path
              d="M227.38 214.853C227.634 214.424 227.786 213.888 227.786 213.307C227.786 211.896 226.896 210.752 225.794 210.752C224.692 210.752 223.802 211.896 223.802 213.307C223.802 214.718 224.692 215.862 225.794 215.862C226.442 215.862 227.017 215.467 227.38 214.853Z"
              fill="#FEE39E"
            />
            <path
              d="M241.915 101.515C241.591 101.779 241.177 101.936 240.728 101.936C240.146 101.936 239.626 101.676 239.278 101.265C239.2 101.17 239.13 101.067 239.067 100.958C239.032 100.893 239.001 100.827 238.974 100.758L238.923 100.619C238.864 100.438 238.833 100.244 238.833 100.044C238.833 99.3573 239.2 98.7562 239.747 98.4242C239.931 98.3133 240.134 98.2323 240.353 98.1883C240.474 98.1639 240.599 98.1507 240.728 98.1507C241.771 98.1507 242.618 98.9984 242.618 100.044C242.618 100.395 242.524 100.725 242.356 101.007C242.239 101.202 242.091 101.373 241.915 101.515Z"
              fill="#FEE39E"
            />
            <path
              d="M271.794 109.03C272.837 109.03 273.685 108.183 273.685 107.138L273.681 106.994L273.646 106.746C273.587 106.464 273.466 106.204 273.294 105.983C273.032 105.646 272.661 105.399 272.235 105.296C272.095 105.263 271.946 105.244 271.794 105.244C271.122 105.244 270.532 105.594 270.196 106.12C270.11 106.258 270.04 106.408 269.989 106.566C269.931 106.746 269.899 106.938 269.899 107.138C269.899 108.183 270.747 109.03 271.794 109.03Z"
              fill="#FEE39E"
            />
            <path
              d="M275.575 153.37C275.575 154.416 274.728 155.263 273.685 155.263C272.638 155.263 271.79 154.416 271.79 153.37C271.79 152.325 272.638 151.477 273.685 151.477C273.88 151.477 274.067 151.507 274.243 151.561C274.587 151.667 274.888 151.869 275.118 152.137C275.263 152.306 275.376 152.499 275.454 152.712C275.532 152.917 275.575 153.139 275.575 153.37Z"
              fill="#FEE39E"
            />
            <path
              d="M244.513 196.359C245.556 196.359 246.403 195.512 246.403 194.466C246.403 194.222 246.356 193.989 246.274 193.774C246.157 193.474 245.962 193.211 245.72 193.008C245.392 192.737 244.97 192.573 244.513 192.573C243.466 192.573 242.618 193.421 242.618 194.466C242.618 195.117 242.946 195.69 243.446 196.031C243.751 196.238 244.118 196.359 244.513 196.359Z"
              fill="#FEE39E"
            />
            <path
              d="M273.833 244.897C273.493 245.215 273.04 245.409 272.54 245.409C272.017 245.409 271.54 245.196 271.196 244.851C270.856 244.509 270.646 244.037 270.646 243.516C270.646 242.471 271.493 241.623 272.54 241.623C273.583 241.623 274.431 242.471 274.431 243.516C274.431 244.061 274.2 244.552 273.833 244.897Z"
              fill="#FEE39E"
            />
            <defs>
              <linearGradient
                id="paint0_linear_3094_830"
                x1="418.367"
                y1="108.233"
                x2="-1.36448"
                y2="754.046"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.367698" stop-color="#414141" />
                <stop offset="0.788937" stop-color="#F69400" />
              </linearGradient>
              <radialGradient
                id="paint1_radial_3094_830"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(241 187.403) rotate(92.1211) scale(135.093 58.2199)"
              >
                <stop offset="0.706027" stop-color="#121212" />
                <stop offset="1" stop-color="#121212" stop-opacity="0" />
              </radialGradient>
              <radialGradient
                id="paint2_radial_3094_830"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(242 373.403) rotate(-73.8631) scale(60.3789 37.3609)"
              >
                <stop offset="0.610863" stop-color="#121212" />
                <stop offset="1" stop-color="#645135" stop-opacity="0" />
              </radialGradient>
              <radialGradient
                id="paint3_radial_3094_830"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(278.262 192.835) scale(98.4615 780.258)"
              >
                <stop stop-color="#FE983A" />
                <stop offset="0.0572917" stop-color="#FE983A" />
                <stop offset="0.189101" stop-color="#FE7A3A" />
                <stop offset="0.45303" stop-color="#E33812" />
                <stop offset="0.933333" stop-color="#FE7A3A" />
              </radialGradient>
              <radialGradient
                id="paint4_radial_3094_830"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(337.969 60.4475) rotate(109.904) scale(302.162 129.693)"
              >
                <stop offset="0.611939" stop-color="#F6EDE3" stop-opacity="0" />
                <stop offset="0.827781" stop-color="#E56F15" />
                <stop offset="0.887395" stop-color="#F15721" />
                <stop offset="1" stop-color="#F15721" />
              </radialGradient>
              <radialGradient
                id="paint5_radial_3094_830"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(319.288 307.073) rotate(-105.419) scale(296.26 126.511)"
              >
                <stop offset="0.738935" stop-color="#FB7F2C" stop-opacity="0" />
                <stop offset="0.932709" stop-color="#FB7F2C" />
              </radialGradient>
              <radialGradient
                id="paint6_radial_3094_830"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(272.924 67.3569) rotate(54.7395) scale(75.2032 59.7918)"
              >
                <stop stop-color="white" />
                <stop offset="0.109375" stop-color="white" />
                <stop offset="0.262522" stop-color="white" stop-opacity="0" />
              </radialGradient>
              <radialGradient
                id="paint7_radial_3094_830"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(263.152 326.845) rotate(108.435) scale(70.7875)"
              >
                <stop offset="0.0677083" stop-color="#FFC56D" />
                <stop offset="0.25" stop-color="#FF9B04" />
                <stop offset="0.645065" stop-color="#E66000" />
                <stop offset="1" stop-color="#CBFBB5" />
              </radialGradient>
              <radialGradient
                id="paint8_radial_3094_830"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(254.541 382.996) rotate(-90) scale(27.8829 55.102)"
              >
                <stop stop-color="#CBFBB5" />
                <stop offset="1" stop-color="#CBFBB5" stop-opacity="0" />
              </radialGradient>
              <radialGradient
                id="paint9_radial_3094_830"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(255.869 344.491) rotate(97.8153) scale(68.3506)"
              >
                <stop offset="0.446038" stop-color="white" stop-opacity="0" />
                <stop offset="0.841379" stop-color="white" />
              </radialGradient>
            </defs>
          </svg>
        )}
      </div>
    );
  }
}

export default ErrorImage;
