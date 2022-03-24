export function TableSVG({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      style={style}
      viewBox="0 0 580 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="580" height="21" fill="#F2BB59" />
      <rect x="24" y="21" width="533" height="75" fill="#C7851F" />
      <g filter="url(#filter0_f_2_5)">
        <rect
          x="24"
          y="21"
          width="533"
          height="23"
          fill="black"
          fill-opacity="0.2"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_2_5"
          x="20"
          y="17"
          width="541"
          height="31"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2"
            result="effect1_foregroundBlur_2_5"
          />
        </filter>
      </defs>
    </svg>
  );
}
