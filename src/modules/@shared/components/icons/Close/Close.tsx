import React from 'react';

const Close = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line
        x1="0.353553"
        y1="0.646447"
        x2="13.3536"
        y2="13.6464"
        stroke="black"
      />
      <line
        x1="0.646447"
        y1="13.6464"
        x2="13.6464"
        y2="0.646446"
        stroke="black"
      />
    </svg>
  );
};

export default Close;
