interface IProps {
  src: string;
  className?: string;
}
function IconImg({ src, className = "w-5 h-5" }: IProps) {
  return <img src={src} alt="" className={className} />;
}

export default IconImg;
