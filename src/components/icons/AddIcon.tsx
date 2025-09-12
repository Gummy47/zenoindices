interface IconProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function AddIcon({ width = 18, height = 18, className }: IconProps) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 166 166" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M123,79h-37v-37c0-2.2-1.8-4-4-4s-4,1.8-4,4v37h-37c-2.2,0-4,1.8-4,4s1.8,4,4,4h37v37c0,2.2,1.8,4,4,4s4-1.8,4-4v-37h37c2.2,0,4-1.8,4-4s-1.8-4-4-4Z" />
    </svg>
  );
}