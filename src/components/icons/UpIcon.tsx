interface IconProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function UpIcon({ width = 16, height = 16, className }: IconProps) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 166 166" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M78.33,47.92l-36.24,32.79c-1.43,1.28-1.55,3.47-.28,4.9,1.28,1.43,3.47,1.55,4.9.28l30.36-27.52v18.8c0,27.82,0,11.65-.04,39.47,0,2.51.73,3.84,2.53,4.56l1.62.06.15-.06c1.8-.72,2.53-2.04,2.52-4.56-.04-27.36-.04-10.72-.03-38.08v-20.54l30.75,27.81c1.43,1.28,3.62,1.15,4.9-.28s1.15-3.62-.28-4.9v.07l-36.24-32.79c-1.31-1.19-3.31-1.19-4.62,0Z"/>
    </svg>
  );
}