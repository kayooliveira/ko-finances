import React, { SVGAttributes } from 'react'

type IconProps = SVGAttributes<SVGElement>

export function Icon({ ...props }: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      viewBox="0 0 40 40"
    >
      <path
        fill="#33CC95"
        d="M34.142 5.858A19.87 19.87 0 0020 0 19.87 19.87 0 005.858 5.858 19.87 19.87 0 000 20a19.87 19.87 0 005.858 14.142A19.869 19.869 0 0020 40a19.87 19.87 0 0014.142-5.858A19.87 19.87 0 0040 20a19.87 19.87 0 00-5.858-14.142z"
      ></path>
      <g
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        clipPath="url(#clip0_35212_209)"
      >
        <path d="M20.571 8v25.143M26.286 12.571h-8.572a4 4 0 000 8h5.715a4 4 0 010 8h-9.715"></path>
      </g>
      <defs>
        <clipPath id="clip0_35212_209">
          <path
            fill="#fff"
            d="M0 0H27.429V27.429H0z"
            transform="translate(6.857 6.857)"
          ></path>
        </clipPath>
      </defs>
    </svg>
  )
}
